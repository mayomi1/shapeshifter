export interface IKeyValuePair {
  [key: string]: string | any;
}

export const useFormSubmission = () => {
  return {
    reset(event: React.FormEvent<HTMLFormElement>) {
      event.persist();
      (event.target as HTMLFormElement).reset();
    },

    /**
     * Handle form submission
     * @param event Submission event
     * @param postRequestAction Function to do after a successful submission
     */
    async submit(
      event: React.FormEvent<HTMLFormElement>,
      postRequestAction: (payload: IKeyValuePair) => void,
    ) {
      event.preventDefault();
      event.persist();

      let payload: IKeyValuePair = {};

      payload = serializeForm(event);

      postRequestAction(payload);
    },
  };
};

export const serializeFromElement = (element: HTMLElement | null): IKeyValuePair => {
  const payload: IKeyValuePair = {};
  if (!element) {
    return payload;
  }
  const inputs = element.querySelectorAll('input, select');
  (inputs as NodeListOf<HTMLInputElement>)
    .forEach(({name, type, value}) => {
      if(type) {
        payload[name] = value;
      }
    });
  return payload;
};

export const serializeForm = (event: React.FormEvent<HTMLFormElement>): IKeyValuePair => {
  const inputs = (event.target as HTMLFormElement);

  return serializeFromElement(inputs);
};

