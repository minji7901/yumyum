export default function RootLayout({
  children,
  dailyNutritionModal
}: Readonly<{
  children: React.ReactNode;
  dailyNutritionModal?: React.ReactNode;
}>) {
  return (
    <>
      {children}
      {dailyNutritionModal}
    </>
  );
}
