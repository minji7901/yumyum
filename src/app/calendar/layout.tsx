import CalendarDateContext from "@/components/calendar/CalendarDateContext";

export default function RootLayout({
  children,
  dailyNutritionModal
}: Readonly<{
  children: React.ReactNode;
  dailyNutritionModal?: React.ReactNode;
}>) {
  return (
    <CalendarDateContext>
      {children}
      {dailyNutritionModal}
    </CalendarDateContext> 
  );
}
