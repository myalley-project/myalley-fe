export default function returnkeys(givenLength: number) {
  const keytray = Array.from({ length: givenLength }, (undef, index) =>
    crypto.randomUUID()
  );
  return keytray;
}
