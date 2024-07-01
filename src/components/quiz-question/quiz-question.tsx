import { useMemo } from 'react';

import { CheckedState } from '@radix-ui/react-checkbox';
import cc from 'classcat';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Answer, QuizQuestionModelProps } from '@/shared/constants/quiz.ts';

interface QuizQuestionProps<Name extends FieldValues> {
  isVisible: boolean;
  question: QuizQuestionModelProps;
  customChange?: (name: FieldPath<Name>, value: string) => void;
}

export const QuizQuestion = <Name extends FieldValues>({
  isVisible,
  question,
}: QuizQuestionProps<Name>) => {
  const { control } = useFormContext();

  const { questionName, questionTitle, answers, correctAnswer } = question;
  const allowMultipleAnswers = Array.isArray(correctAnswer);

  const shuffledAnswers = useMemo(
    () => [...answers].sort(() => Math.random() - 0.5),
    [answers],
  );

  return (
    <div className={cc([{ hidden: !isVisible }])}>
      <CardHeader>
        <CardTitle className='text-2xl text-primary'>{questionTitle}</CardTitle>
      </CardHeader>
      <CardContent className='flex w-full flex-col items-start justify-center gap-4'>
        <FormField
          control={control}
          name={questionName}
          render={({ field: { value, onChange }, formState }) => {
            const isChecked = (name: string) =>
              allowMultipleAnswers ? value?.includes(name) : value === name;

            const isCorrectAnswer = (name: string) =>
              allowMultipleAnswers
                ? correctAnswer.includes(name)
                : correctAnswer === name;

            const isWrongAnswer = (name: string) =>
              isChecked(name) &&
              !isCorrectAnswer(name) &&
              formState.isSubmitted;

            const handleChange = (name: string, checked: CheckedState) => {
              if (!checked) {
                return onChange(null);
              }
              onChange(name);
            };

            const handleMultipleChange = (
              name: string,
              checked: CheckedState,
            ) => {
              if (!value && checked) return onChange([name]);

              const isChecked = value?.includes(name);

              if (!checked && isChecked) {
                const newValue = value.filter((item: string) => item !== name);

                return onChange(newValue);
              }
              onChange([...value, name]);
            };

            return (
              <>
                {shuffledAnswers?.map((item: Answer) => (
                  <FormItem
                    key={item.name}
                    className={cc([
                      'flex w-full flex-row items-center justify-center rounded-lg p-1',
                      {
                        'text-green-500':
                          isCorrectAnswer(item.name) && formState.isSubmitted,
                        'text-red-500': isWrongAnswer(item.name),
                      },
                    ])}
                  >
                    <FormControl>
                      <Checkbox
                        checked={isChecked(item.name)}
                        className='size-7 rounded-full'
                        disabled={formState.isSubmitted}
                        onCheckedChange={(checked) =>
                          allowMultipleAnswers
                            ? handleMultipleChange(item.name, checked)
                            : handleChange(item.name, checked)
                        }
                      />
                    </FormControl>
                    <FormLabel className='w-full cursor-pointer pl-3 text-xl font-normal'>
                      {item.answer}
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                ))}
              </>
            );
          }}
        />
      </CardContent>
    </div>
  );
};
