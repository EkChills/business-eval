import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BusinessAgeSection({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How old is your business?</h3>
      <FormField
        control={form.control}
        name="businessAge"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-3"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="less_than_1_year" />
                  </FormControl>
                  <FormLabel className="font-normal">Less than 1 year</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="between_1_and_5_years" />
                  </FormControl>
                  <FormLabel className="font-normal">Between 1 and 5 years</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="between_5_and_10_years" />
                  </FormControl>
                  <FormLabel className="font-normal">Between 5 and 10 years</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="above_10_years" />
                  </FormControl>
                  <FormLabel className="font-normal">Above 10 years</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}