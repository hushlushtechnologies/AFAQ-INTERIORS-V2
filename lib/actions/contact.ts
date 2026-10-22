"use server";

import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/siteConfig";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number."),
  projectType: z.enum(["residential", "commercial", "hospitality", "other"], {
    error: "Please choose a project type.",
  }),
  location: z.string().trim().min(1, "Please choose a location."),
  budget: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(2000, "Please keep your message under 2,000 characters."),
});

type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string[]>>;
  values?: Partial<Record<ContactField, string>>;
  submittedAt?: number;
};

const FIELDS: ContactField[] = ["name", "email", "phone", "projectType", "location", "budget", "message"];

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const submittedAt = Date.now();
  const get = (key: string) => String(formData.get(key) ?? "");

  // 1. Honeypot — silently "succeed" for bots
  if (get("website")) return { status: "success", submittedAt };

  const values = Object.fromEntries(FIELDS.map((f) => [f, get(f)])) as Record<ContactField, string>;

  // 2. Validate
  const result = contactSchema.safeParse(values);
  if (!result.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: z.flattenError(result.error).fieldErrors,
      values,
      submittedAt,
    };
  }

  const fallback = `Sorry, we couldn't send your message right now. Please call us on ${siteConfig.phone.display} or email ${siteConfig.email}.`;

  // 3. Config check
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return { status: "error", message: fallback, values, submittedAt };
  }

  // 4. Send
  const data = result.data;
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `New enquiry: ${data.name} (${data.projectType})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Project type: ${data.projectType}`,
        `Location: ${data.location}`,
        `Budget: ${data.budget || "Not specified"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) throw error;
  } catch (err) {
    console.error("[contact] Send failed", err);
    return { status: "error", message: fallback, values, submittedAt };
  }

  return { status: "success", submittedAt };
}