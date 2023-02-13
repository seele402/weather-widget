export default function calculateDewPoint(
  temperature: number,
  humidity: number
) {
  const a = 17.625;
  const b = 243.04;
  const alpha =
    Math.log(Number(humidity) / 100) +
    (a * Number(temperature)) / (b + Number(temperature));
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint);
}
