import React, { useState, useEffect } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {};

    if (formData.email && !EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }

    if (formData.password && !PASSWORD_REGEX.test(formData.password)) {
      newErrors.password =
        'Şifre en az 8 karakter, bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir.';
    }

    setErrors(newErrors);

    const isEmailValid = EMAIL_REGEX.test(formData.email);
    const isPasswordValid = PASSWORD_REGEX.test(formData.password);
    const isTermsChecked = formData.terms;

    setIsValid(isEmailValid && isPasswordValid && isTermsChecked);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="login-container">
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-posta:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="örnek@email.com"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Şifre:</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            Şartları ve Koşulları Kabul Ediyorum
          </label>
        </div>

        <button type="submit" disabled={!isValid}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
}