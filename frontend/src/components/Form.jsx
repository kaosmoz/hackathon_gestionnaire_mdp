import { useState } from "react";

const Form = ({ inputs, onSubmit, submitLabel, successMessage }) => {
  const [formData, setFormData] = useState(
    inputs.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === "file" ? null : "",
      }),
      {}
    )
  );

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e, field) => {
    const value = field.type === "file" ? e.target.files : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field.name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    inputs.forEach((field) => {
      if (field.validation?.required && !formData[field.name]?.length) {
        newErrors[field.name] = field.validation.required;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      setServerError(err?.response?.data?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (success && successMessage) {
    return (
      <div className="text-center space-y-4">
        <div className="text-4xl">✅</div>
        <p className="text-green-600 font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {inputs.map((field) => (
        <div key={field.name}>
          <label className="text-sm font-medium">{field.label}</label>

          {field.type === "select" ? (
            <select
              value={formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Sélectionnez une catégorie</option>
              {field.options?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={field.type === "file" ? undefined : formData[field.name]}
              onChange={(e) => handleChange(e, field)}
              placeholder={field.placeholder || ""}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          )}

          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      {serverError && (
        <p className="text-red-600 text-sm text-center">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-slate-900 to-slate-800 text-white py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Chargement..." : submitLabel}
      </button>
    </form>
  );
};

export default Form;
