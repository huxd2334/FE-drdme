// src/components/Auth/LoginForm.jsx
import { useAuth } from '../../contexts/AuthContext';
import Form from '../common/Form';

export default function LoginForm({
  initialValues = { identifier: '', password: '' },
  onSuccess,
  onError,
  isLoading = false,
}) {
  const { login } = useAuth();
  const validateFn = (v) => {
    const errs = {};
    if (!v.identifier?.trim()) errs.identifier = 'Vui lòng nhập Doctor ID hoặc Email công việc';
    if (!v.password) errs.password = 'Vui lòng nhập mật khẩu';
    return errs;
  };

  const fields = [
    {
      name: 'identifier',
//       label: 'Doctor ID / Email công việc',
      component: 'input',
      type: 'text',
      placeholder: 'Doctor ID / Email',
      required: true,
      trim: true,
      autoComplete: 'username',
    },
    {
      name: 'password',
      component: 'input',
      type: 'password',
      placeholder: 'Mật khẩu',
      required: true,
      trim: true,
      autoComplete: 'current-password',
      rightIcon: 'eye'
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const res = await login({ identifier: values.identifier, password: values.password });
      if (res?.success) {
        onSuccess?.(res);
      } else {
        onError?.(res?.error || 'Đăng nhập thất bại');
      }
    } catch (e) {
      onError?.(e?.message || 'Có lỗi xảy ra khi đăng nhập');
    }
  };

  return (
    <Form
      fields={fields}
      initialValues={initialValues}
      validate={validateFn}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitText="Đăng nhập"
      fullWidth
    />
  );
}
