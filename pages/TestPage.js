import Widget from "../components/widget";

function TestPage() {
  return (
    <div>
      <header className="sticky top-0 bg-red-500">
        <h2>header</h2>
      </header>

      <h3>Test page</h3>
      <Widget />
    </div>
  );
}

export default TestPage;
