import { Switch } from '$/components/ui/switch';
import { useDescription, useTsController } from '@ts-react/form';

export default function ToggleField() {
  const { field } = useTsController<boolean>();
  const { label } = useDescription();

  return (
    <div className="flex items-center gap-2 text-lg">
      <label>{label}</label>
      <Switch checked={field.value ?? false} onCheckedChange={(checked) => field.onChange(checked)} />
    </div>
  );
}
