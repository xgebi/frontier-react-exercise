import React, {ChangeEvent, ChangeEventHandler, FocusEventHandler, useState} from 'react';

/**
 * Props that are shared between elements
 */
type ElementComponentProps = {
  data: Frontier.Element,
  passData: Function,
  appState: Map<string, string>
}

/**
 * Generates a component for a form element where yes/no choice is needed
 *
 * @param data
 * @param passData
 * @param appState
 * @constructor
 */
function SingleChoiceComponent({ data, passData, appState }: ElementComponentProps): JSX.Element {
  const [value, setValue] = useState(appState.get(data.id)! === 'true');

  /**
   * Prepares data for app's state update
   * @param event
   */
  function processData(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.checked);
    passData({
      id: data.id,
      value: event.target.checked.toString(),
    });
  }
  return (
    <div className={"element"}>
      <label htmlFor={data.id}>
        <input type="checkbox" name={data.id} id={data.id} onChange={processData} checked={value} />
        {data.question_text} {data.metadata.required && <span>(required)</span>}
      </label>
    </div>
  );
}

/**
 * Generates a list of options for user to choose from
 *
 * @param data
 * @param passData
 * @param appState
 * @constructor
 */
function MultiChoiceComponent({ data, passData, appState }: ElementComponentProps): JSX.Element {
  const values = new Map<string, boolean>();
  data.metadata.options?.forEach((option: { label: string; value: string }) => {
    values.set(option.label, appState.get(data.id) ? appState.get(data.id)!.indexOf(option!.value) >= 0 : false);
  })

  const [value, setValue] = useState(values);

  /**
   * Prepares data for app's state update
   * @param event
   */
  function processData(event: React.ChangeEvent<HTMLInputElement>) {
    const newMap = new Map(value);
    newMap.set(event.target.name, event.target.checked)
    setValue(newMap)
    let items: string = "";

    // @ts-ignore
    for (let item of newMap) {
      if (item[1]) {
        items = items.length > 0 ? `${items},${item[0]}` : item[0];
      } else if (items.indexOf(item[0]) >= 0) {
        items = items.split(",").filter(lang => {
          return lang !== event.target.name
        }).join(",");
      }
    }
    passData({
      id: data.id,
      value: items,
    });
  }
  return (
    <div className={"element"}>
      <span>{data.question_text} {data.metadata.required && <span>(required)</span>}</span>
      <div className={`dropdown`}>
        {data.metadata.options?.map(option => {
          return (
            <div key={option.label}>
              <input type="checkbox" id={option.label} name={option.label} checked={value.get(option.label) as boolean} value={option.value} onChange={processData}/>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Generates component for text, number and email address. By default it creates a text input.
 *
 * @param data
 * @param passData
 * @param appState
 * @constructor
 */
function TextComponent({ data, passData, appState }: ElementComponentProps): JSX.Element {
  const [value, setValue] = useState(appState.get(data.id) ? appState.get(data.id)! : "");
  const [valid, setValid] = useState(true)

  /**
   * Prepares data for app's state update
   * @param event
   */
  function processData(event: React.FocusEvent<HTMLInputElement>) {
    if (event.target.pattern && event.target.value.length > 0) {
      setValid(!!event.target.value.match(event.target.pattern));
    }
    passData({
      id: data.id,
      value: event.target.value,
    });
  }
  const input = (): JSX.Element => {
    switch (data.metadata.format) {
      case "email":
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            pattern={data.metadata.pattern}
            placeholder={data.metadata.placeholder}
            className={!valid ? "invalid" : ""}
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={processData}/>
        )
      case "number":
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            placeholder={data.metadata.placeholder}
            step={data.metadata.step}
            min={data.metadata.min}
            max={data.metadata.max}
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={processData}/>
        )
      default:
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            placeholder={data.metadata.placeholder}
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={processData} />
        )
    }
  }
  return (
    <div className={"element"}>
      <label htmlFor={data.id}>{data.question_text} {data.metadata.required && <span>(required)</span>}</label>
      {input()}
    </div>
  );
}

/**
 * Generates a text area component
 *
 * @param data
 * @param passData
 * @param appState
 * @constructor
 */
function TextareaComponent({ data, passData, appState }: ElementComponentProps): JSX.Element {
  const [value, setValue] = useState(appState.get(data.id)!);

  /**
   * Prepares data for app's state update
   * @param event
   */
  function processData(event: React.FocusEvent<HTMLTextAreaElement>) {
    passData({
      id: data.id,
      value: event.target.value,
    });
  }
  return (
    <div className={"element"}>
      <label htmlFor={data.id}>{data.question_text} {data.metadata.required && <span>(required)</span>}</label>
      <textarea
        id={data.id}
        name={data.id}
        onBlur={processData}
        value={value}
        onChange={event => setValue(event.target.value)}
        required={data.metadata.required}
      />
    </div>
  );
}

/**
 * Component which chooses which should be generated. Default option is span in this case as by default it is
 * an inline element and shouldn't break UI.
 *
 * @param data
 * @param passData
 * @param appState
 * @constructor
 */
function ElementComponent({ data, passData, appState }: ElementComponentProps): JSX.Element {
  switch (data.type) {
    case "boolean": return (<SingleChoiceComponent data={data} passData={passData} appState={appState} />)
    case "multichoice": return (<MultiChoiceComponent data={data} passData={passData} appState={appState} />);
    case "text": return (<TextComponent data={data} passData={passData} appState={appState} />)
    case "textarea": return (<TextareaComponent data={data} passData={passData} appState={appState} />)
    default:
      return (<span />);
  }
}
export default ElementComponent;
// next export is mostly for testing purposes
export { SingleChoiceComponent, MultiChoiceComponent, TextareaComponent, TextComponent };