
import Button from '../Button/index';
import Input from '../Input/index';
import Select from '../Input/Select';
import TextArea from '../Input/TextArea'
import useForm from '../../../hooks/useForm';

const componentMap = {
  input: Input,
  select: Select,
  textarea: TextArea
};

/**
 * Form
 * props:
 *  - fields: [
 *      { name, label, component: 'input'|'select'|'textarea', type, placeholder, required,
 *        props?: any, options?: [] | (values)=>[], disabled?: boolean, trim?: boolean }
 *    ]
 *  - initialValues
 *  - validate(values) => { field: 'message' }
 *  - onSubmit(values)
 *  - onCancel()
 *  - submitText, cancelText
 *  - isLoading
 *  - columns: 1|2|3 (tailwind grid)
 */
export default function Form({
  fields = [],
  initialValues = {},
  validate,
  onSubmit,
  onCancel,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isLoading = false,
  columns = 1,
  fullWidth = false,
}) {
  const submitAdapter = async (vals) => {
    const out = { ...vals };
    for (const f of fields) {
      const v = out[f.name];
      if (f.trim && typeof v === 'string') out[f.name] = v.trim();
      if (f.type === 'number') out[f.name] = Number(v ?? 0);
    }
    return onSubmit?.(out);
  };

  const {
    values, errors, touched, submitting,
    handleChange, handleBlur, handleSubmit,
  } = useForm({ initialValues, validate, onSubmit: submitAdapter });

  const gridCols =
    columns === 3 ? 'sm:grid-cols-3' :
    columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-1';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
        {fields.map((f) => {
          const Comp = componentMap[f.component] || Input;
          const fieldValue = values[f.name] ?? '';
          const fieldError = touched[f.name] && errors[f.name];
          const opts = typeof f.options === 'function' ? f.options(values) : f.options;

          return (
            <Comp
              key={f.name}
              label={f.label}
              type={f.type}
              value={fieldValue}
              onChange={handleChange(f.name)}
              onBlur={handleBlur(f.name)}
              error={fieldError}
              placeholder={f.placeholder}
              required={f.required}
              disabled={isLoading || submitting || f.disabled}
              options={opts}
              {...(f.props || {})}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel && (
          <Button
            variant="outline"
            type="button"
            size="small"
            onClick={onCancel}
            disabled={isLoading || submitting}
          >
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          size="medium"
          variant="primary"
          disabled={isLoading || submitting}
          fullWidth={fullWidth}
        >
          {isLoading || submitting ? 'Saving…' : submitText}
        </Button>
      </div>
    </form>
  );
}
