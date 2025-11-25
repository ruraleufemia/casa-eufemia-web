import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { CalendarIcon, Mail, Phone, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t, i18n } = useTranslation();
  
  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: t('contact.errors.nameMin') })
      .max(100, { message: t('contact.errors.nameMax') }),
    email: z
      .string()
      .trim()
      .email({ message: t('contact.errors.emailInvalid') })
      .max(255, { message: t('contact.errors.emailMax') }),
    phone: z
      .string()
      .trim()
      .min(9, { message: t('contact.errors.phoneMin') })
      .max(20, { message: t('contact.errors.phoneMax') }),
    checkIn: z.date({
      required_error: t('contact.errors.checkInRequired'),
    }),
    checkOut: z.date({
      required_error: t('contact.errors.checkOutRequired'),
    }),
    guests: z
      .string()
      .min(1, { message: t('contact.errors.guestsMin') })
      .max(2, { message: t('contact.errors.guestsMax') }),
    message: z
      .string()
      .trim()
      .min(10, { message: t('contact.errors.messageMin') })
      .max(1000, { message: t('contact.errors.messageMax') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const message = `${t('contact.whatsappMessage')}
    
${t('contact.nameLabel')} ${values.name}
${t('contact.emailLabel')} ${values.email}
${t('contact.phoneLabel')} ${values.phone}
${t('contact.checkInLabel')} ${format(values.checkIn, "dd/MM/yyyy")}
${t('contact.checkOutLabel')} ${format(values.checkOut, "dd/MM/yyyy")}
${t('contact.guestsLabel')} ${values.guests}

${t('contact.messageLabel')} ${values.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "34638014458";
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    
    toast.success(t('contact.successMessage'));
    form.reset();
  };

  const dateLocale = i18n.language === 'es' ? es : enUS;

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.name')} *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Juan Pérez" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.email')} *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.phone')} *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="+34 600 000 000"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.guests')} *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          placeholder="2"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('contact.checkIn')} *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: dateLocale })
                            ) : (
                              <span>{t('contact.selectDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t('contact.checkOut')} *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: dateLocale })
                            ) : (
                              <span>{t('contact.selectDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.message')} *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('contact.messagePlaceholder')}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                {t('contact.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactForm;
