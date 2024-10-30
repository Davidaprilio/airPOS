import { Button } from "@/Components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip"
import { cn } from "@/lib/utils"
import { InputHTMLAttributes } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { PiInfo } from "react-icons/pi"


export default function FormInputField({ field, description, info, button, label, buttonOnclick, required, ...props }: InputHTMLAttributes<{}> & {
    field: ControllerRenderProps<any>
    description?: string
    label?: string
    info?: string | JSX.Element
    button?: string | JSX.Element
    buttonOnclick?: () => void
}) {
    return (
        <FormItem className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 space-y-0.5'>
            {label && (
                <FormLabel>
                    {label}
                    {required && (<sup className='text-destructive' title='* berarti input wajib diisi'>*</sup>)}
                    {info && (
                        <Tooltip>
                            <TooltipTrigger tabIndex={-1}>
                                <PiInfo className='inline-block ml-2' />
                            </TooltipTrigger>
                            <TooltipContent className='max-w-sm font-normal' side='bottom'>
                                {typeof info === 'string' ? (<p>{info}</p>) : info}
                            </TooltipContent>
                        </Tooltip>
                    )}
                </FormLabel>
            )}
            {description && (
                <FormDescription className='!-mt-1 !mb-1'>{description}</FormDescription>
            )}
            <div className='flex'>
                <FormControl>
                    <Input {...field}
                        value={field.value ?? ''}
                        {...props}
                        className={cn({
                            'rounded-r-none': button
                        })}
                    />
                </FormControl>
                {button && (
                    <Button type='button' className='rounded-l-none border-l-0' variant='outline' onClick={buttonOnclick}>
                        {button}
                    </Button>
                )}
            </div>
            <FormMessage />
        </FormItem>
    )
}