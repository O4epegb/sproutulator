import React from 'react';
import ReactDom from 'react-dom';
import { observer, useLocalStore } from 'mobx-react';
import { roundToTwo } from './utils';
import { ruleSets } from './data';
import { calculate } from './calculate';

const root = document.createElement('div');

document.body.append(root);

export function renderApp() {
  ReactDom.render(<App />, root);
}

const App = observer(() => {
  const store = useLocalStore(() => ({
    ruleSets: ruleSets.map((set, index) => ({ ...set, enabled: index === 0 })),
    booleanInputs: ['A', 'B', 'C'].map((name) => ({ name, isEnabled: true })),
    numberInputs: ['D', 'E', 'F'].map((name, index) => ({
      name,
      value: '5',
      isValid: true,
      type: index === 0 ? 'float' : 'integer',
    })),
  }));

  const enabledRules = store.ruleSets.filter((set) => set.enabled);
  const booleanInputValues = store.booleanInputs.map((i) => i.isEnabled);
  const numberInputValues = store.numberInputs.map((i) =>
    i.type === 'float' ? parseFloat(i.value) : parseInt(i.value)
  );

  const { H, K: kResult, activeHExpression, activeKExpression } = calculate(
    enabledRules,
    booleanInputValues,
    numberInputValues
  );

  const K = !isNaN(kResult) ? roundToTwo(kResult) : null;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-md space-y-4 p-2">
        <h1 className="text-4xl">Most useful calculator</h1>

        <div className="flex flex-wrap space-x-2">
          <div className="space-y-1 flex-1">
            <h3 className="text-2xl">Pick things</h3>
            <div className="flex space-x-3">
              {store.booleanInputs.map((input) => (
                <button
                  key={input.name}
                  className={`p-2 rounded font-mono whitespace-no-wrap ${
                    input.isEnabled ? 'bg-green-200' : 'bg-gray-200'
                  }`}
                  onClick={() => (input.isEnabled = !input.isEnabled)}
                >
                  <span className="font-bold">
                    {input.isEnabled ? '+' : '-'}
                  </span>{' '}
                  {input.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-2xl">Type numbers</h3>
            <div className="space-y-2">
              {store.numberInputs.map((input) => (
                <div
                  key={input.name}
                  className="md:flex md:items-center flex-wrap justify-start"
                >
                  <div>
                    <label
                      className="block text-gray-800 md:text-right mb-1 md:mb-0 pr-4 font-mono"
                      htmlFor={`number-input-${input.name}`}
                    >
                      {input.name}
                    </label>
                  </div>
                  <div className="flex-1">
                    <input
                      className="bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white"
                      id={`number-input-${input.name}`}
                      type="number"
                      value={input.value}
                      step={input.type === 'float' ? '0.1' : '1'}
                      onChange={(e) => {
                        input.value = e.target.value;

                        const newValue = parseFloat(e.target.value);

                        input.isValid =
                          !isNaN(newValue) &&
                          (input.type === 'float' ||
                            Number.isInteger(newValue));
                      }}
                    />

                    {!input.isValid && (
                      <div className="text-red-400 w-full">
                        Not valid, please enter valid {input.type} number
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl">See results</h3>
          <div className="flex font-mono">
            <div className="flex flex-row flex-1 p-4 justify-center items-center">
              <div className="text-4xl">H = {H ?? '?'}</div>
            </div>
            <div className="flex flex-row flex-1 p-4 justify-center items-center">
              <div className="text-4xl">K = {K ?? '?'}</div>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl">And you can even set rules</h3>
          <div className="space-y-3">
            {store.ruleSets.map((set) => (
              <div
                key={set.name}
                className={`p-3 rounded space-y-2 ${
                  set.enabled ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex justify-between space-x-2">
                  <div className="text-xl">{set.name}</div>
                  <button
                    className={`p-1 rounded border border-gray-400 ${
                      set.enabled ? 'text-green-500' : 'text-red-400'
                    }`}
                    onClick={() => (set.enabled = !set.enabled)}
                  >
                    {set.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <div className="flex justify-between flex-wrap">
                  <div className="space-y-2">
                    <div>H expressions</div>
                    <div className="space-y-1">
                      {set.hExpressions.length
                        ? set.hExpressions.map((expression) => (
                            <Expression
                              key={expression.description}
                              text={expression.description}
                              isActive={activeHExpression === expression}
                            />
                          ))
                        : 'None'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>K expressions</div>
                    <div className="space-y-1">
                      {set.kExpressions.length
                        ? set.kExpressions.map((expression) => (
                            <Expression
                              key={expression.description}
                              text={expression.description}
                              isActive={activeKExpression === expression}
                            />
                          ))
                        : 'None'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const Expression: React.FC<{ isActive: boolean; text: string }> = ({
  isActive,
  text,
}) => {
  return (
    <div
      className={`p-2 font-mono rounded ${
        isActive ? 'bg-green-200' : 'bg-gray-200'
      }`}
    >
      {text}
    </div>
  );
};
