import { useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

export default function CustomTypeahead(props: any) {
  const typeaheadRef = useRef(null) as any;

  return (
    <>
      <Typeahead
        {...props}
        ref={typeaheadRef}
        onChange={(item: any[]) => {
          typeaheadRef?.current?.clear();
          props.onChange(item[0]);
        }}
      />
    </>
  );
}
