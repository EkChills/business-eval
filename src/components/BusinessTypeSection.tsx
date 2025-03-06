import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formSchema } from "@/lib/schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function BusinessTypeSection({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Business Type</h3>
      <FormField
        control={form.control}
        name="businessType"
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
                    <RadioGroupItem value="production_manufacturing" />
                  </FormControl>
                  <FormLabel className="font-normal">Production/Manufacturing</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="retail_wholesale" />
                  </FormControl>
                  <FormLabel className="font-normal">Retail/Wholesale</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="services" />
                  </FormControl>
                  <FormLabel className="font-normal">Services</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="agriculture_resources" />
                  </FormControl>
                  <FormLabel className="font-normal">Agriculture/Resources</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="it" />
                  </FormControl>
                  <FormLabel className="font-normal">IT</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="other" />
                  </FormControl>
                  <FormLabel className="font-normal">Other</FormLabel>
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