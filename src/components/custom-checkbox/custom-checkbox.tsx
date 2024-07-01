import { CheckedState } from '@radix-ui/react-checkbox';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';

interface CustomCheckboxProps<Name extends FieldValues, Value> {
  name: FieldPath<Name>;
  customChange?: (name: FieldPath<Name>, value: Value) => void;
  label?: string;
}

export const CustomCheckbox = <Name extends FieldValues>({
  name,
  customChange,
  label,
}: CustomCheckboxProps<Name, CheckedState>) => {
  const { control } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => {
          const handleChange = (checked: CheckedState) => {
            onChange(checked);
            customChange?.(name, checked);
          };

          return (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={value}
                  className='size-7'
                  onCheckedChange={handleChange}
                />
              </FormControl>
              <FormLabel className='w-full cursor-pointer text-xl font-normal'>
                {label}
              </FormLabel>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};
