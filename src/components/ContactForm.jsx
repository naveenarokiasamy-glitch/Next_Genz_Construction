import { useState } from "react";
import { services } from "../data/services";
import "./ContactForm.css";

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  projectLocation: "",
  message: "",
};

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!/^[0-9+\-\s]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.service) errors.service = "Please select a service.";
  if (!values.message.trim()) errors.message = "Please add a short project message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");


    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setValues(initialState);
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-form__success" role="status">
        <h3>Enquiry Received</h3>
        <p>
          Thanks for reaching out — this is a demo confirmation. Enquiries are not yet
          connected to a live inbox; contact us directly at the details on this page for
          now.
        </p>
        <button className="btn btn--outline" onClick={() => setStatus("idle")}>
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && <span className="contact-form__error" id="fullName-error">{errors.fullName}</span>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <span className="contact-form__error" id="phone-error">{errors.phone}</span>}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="contact-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <span className="contact-form__error" id="email-error">{errors.email}</span>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={handleChange}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
          {errors.service && <span className="contact-form__error" id="service-error">{errors.service}</span>}
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="projectLocation">Project Location</label>
        <input
          id="projectLocation"
          name="projectLocation"
          type="text"
          placeholder="e.g. Thillai Nagar, Trichy"
          value={values.projectLocation}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <span className="contact-form__error" id="message-error">{errors.message}</span>}
      </div>

      {status === "error" && (
        <p className="contact-form__error contact-form__error--general" role="alert">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}