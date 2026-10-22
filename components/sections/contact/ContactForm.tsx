"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContact, type ContactField, type ContactState } from "@/lib/actions/contact";
import { budgets, locations, projectTypes } from "@/lib/content/contact";
import { siteConfig } from "@/lib/siteConfig";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const control =
  "mt-2 w-full appearance-none rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-primary/50 focus:border-foreground focus:shadow-[0_1px_0_0_var(--color-foreground)] aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Move focus to the first invalid field
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const first = Object.keys(state.errors)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [state]);

  const err = (name: ContactField) => state.errors?.[name];
  const a11y = (name: ContactField) => ({
    id: name,
    name,
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });
  const value = (name: ContactField) => state.values?.[name] ?? "";

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-12 border border-line bg-surface/50 p-8 md:p-12"
        >
          <CheckCircle2 aria-hidden className="size-10 text-primary" />
          <h3 className="mt-6 font-display text-h3">Thank you, your enquiry is on its way.</h3>
          <p className="mt-4 max-w-md text-lead text-primary">
            A design consultant will review your details and get back to you shortly. For anything urgent, call us on{" "}
            <a href={siteConfig.phone.href} className="underline underline-offset-4 hover:text-foreground">
              {siteConfig.phone.display}
            </a>
            .
          </p>
        </motion.div>
      ) : (
        <motion.form
          key={state.submittedAt ?? "form"}
          ref={formRef}
          action={formAction}
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease }}
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2"
        >
          {/* Honeypot — hidden from people and assistive tech */}
          <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <Field id="name" label="Full name" required error={err("name")}>
            <input {...a11y("name")} type="text" autoComplete="name" required defaultValue={value("name")} className={control} />
          </Field>

          <Field id="email" label="Email" required error={err("email")}>
            <input {...a11y("email")} type="email" autoComplete="email" required defaultValue={value("email")} className={control} />
          </Field>

          <Field id="phone" label="Phone" required error={err("phone")}>
            <input
              {...a11y("phone")}
              type="tel"
              autoComplete="tel"
              required
              placeholder="+971"
              defaultValue={value("phone")}
              className={control}
            />
          </Field>

          <Field id="projectType" label="Project type" required error={err("projectType")}>
            <Select>
              <select {...a11y("projectType")} required defaultValue={value("projectType")} className={control}>
                <option value="" disabled>
                  Select one
                </option>
                {projectTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Select>
          </Field>

          <Field id="location" label="Location" required error={err("location")}>
            <Select>
              <select {...a11y("location")} required defaultValue={value("location")} className={control}>
                <option value="" disabled>
                  Select one
                </option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Select>
          </Field>

          <Field id="budget" label="Estimated budget" error={err("budget")}>
            <Select>
              <select {...a11y("budget")} defaultValue={value("budget")} className={control}>
                <option value="">Prefer not to say</option>
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Select>
          </Field>

          <Field id="message" label="Tell us about your project" required error={err("message")} className="sm:col-span-2">
            <textarea
              {...a11y("message")}
              rows={5}
              required
              placeholder="The space, what you'd like to change, and your ideal timeline."
              defaultValue={value("message")}
              className={cn(control, "resize-y")}
            />
          </Field>

          <div className="flex flex-col gap-6 sm:col-span-2">
            {state.status === "error" && state.message && (
              <p role="alert" className="border-l-2 border-danger pl-4 text-sm text-danger">
                {state.message}
              </p>
            )}

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-sm text-primary">
                We&apos;ll only use your details to respond to your enquiry. See our{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  Privacy Policy
                </a>
                .
              </p>
              <Button type="submit" disabled={isPending} arrow={!isPending} magnetic={!isPending}>
                {isPending ? (
                  <>
                    <Loader2 aria-hidden className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send Enquiry"
                )}
              </Button>
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ---------- helpers ---------- */

type FieldProps = {
  id: ContactField;
  label: string;
  required?: boolean;
  error?: string[];
  className?: string;
  children: ReactNode;
};

function Field({ id, label, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-eyebrow uppercase text-primary">
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        ) : (
          <span className="normal-case tracking-normal text-primary/70"> (optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error[0]}
        </p>
      )}
    </div>
  );
}

function Select({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden className="pointer-events-none absolute bottom-4 right-0 size-4 text-primary" />
    </div>
  );
}