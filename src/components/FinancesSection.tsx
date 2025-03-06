import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

export default function FinancesSection({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-blue-700">Finances</h3>
        <p className="text-gray-500 text-sm">
          Your answers should range between 1 to 5 where 5 means you excel at that area of business
        </p>
      </div>

      <div className="grid gap-6">
        <RatingQuestion
          form={form}
          name="finances.cashFlowUnderstanding"
          question="Do you have a clear understanding of your monthly cash flow?"
        />
        
        <RatingQuestion
          form={form}
          name="finances.profitability"
          question="Is your business consistently profitable?"
        />
        
        <RatingQuestion
          form={form}
          name="finances.emergencyFunds"
          question="Do you have access to funds for emergencies or growth opportunities?"
        />
      </div>
    </div>
  );
}

function RatingQuestion({ form, name, question }: { form: any; name: string; question: string }) {
  return (
    <Card className="p-4 border border-gray-200">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base font-medium">{question}</FormLabel>
            </div>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex justify-between"
              >
                <div className="flex flex-col items-center">
                  <FormItem className="flex flex-col items-center space-y-1">
                    <FormControl>
                      <RadioGroupItem value="1" className="h-5 w-5" />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">1</FormLabel>
                  </FormItem>
                  <span className="text-xs text-gray-500 mt-1">Not at All</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <FormItem className="flex flex-col items-center space-y-1">
                    <FormControl>
                      <RadioGroupItem value="2" className="h-5 w-5" />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">2</FormLabel>
                  </FormItem>
                  <span className="text-xs text-gray-500 mt-1">Barely</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <FormItem className="flex flex-col items-center space-y-1">
                    <FormControl>
                      <RadioGroupItem value="3" className="h-5 w-5" />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">3</FormLabel>
                  </FormItem>
                  <span className="text-xs text-gray-500 mt-1">Somewhat</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <FormItem className="flex flex-col items-center space-y-1">
                    <FormControl>
                      <RadioGroupItem value="4" className="h-5 w-5" />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">4</FormLabel>
                  </FormItem>
                  <span className="text-xs text-gray-500 mt-1">Yes</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <FormItem className="flex flex-col items-center space-y-1">
                    <FormControl>
                      <RadioGroupItem value="5" className="h-5 w-5" />
                    </FormControl>
                    <FormLabel className="font-normal text-xs">5</FormLabel>
                  </FormItem>
                  <span className="text-xs text-gray-500 mt-1">Very Much</span>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Card>
  );
}