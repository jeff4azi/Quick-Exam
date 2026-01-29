import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";

const TestKaTeX = () => {
  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '20px' }}>
      <h2>KaTeX Test Component</h2>

      <p><strong>Test 1 (simple):</strong> E = mc<sup>2</sup> (plain HTML)</p>

      <p><strong>Test 2 (KaTeX inline):</strong>
        <InlineMath math={"E = mc^2"} />
      </p>

      <p><strong>Test 3 (fraction):</strong>
        <InlineMath math={"-\\frac{7\\pi}{6}"} />
      </p>

      <p><strong>Test 4 (summation):</strong>
        <InlineMath math={"\\sum_{r=1}^{3} r^{2}"} />
      </p>

      <p><strong>Test 5 (from your data):</strong>
        <InlineMath math={"Z_{1} = 3 + 2i"} />
      </p>
    </div>
  );
};

export default TestKaTeX;