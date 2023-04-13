import Widget from "../components/widget";

function TestPage() {
  return (
    <div>
      <header className="sticky top-0 bg-red-500">
        <h2>header</h2>
      </header>

      <h2>Test page</h2>
      <Widget />
    </div>
  );
}

export default TestPage;
