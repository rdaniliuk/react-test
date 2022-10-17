import React from 'react';
import classes from './CreateProduct.module.css';

type FormFields = {
  name: string;
  date: string;
  country: string;
  view: string;
  best: string;
  file: string;
};

type FormField = {
  name: HTMLInputElement;
  date: HTMLInputElement;
  country: HTMLSelectElement;
  view: HTMLInputElement;
  best: HTMLInputElement;
  file: HTMLInputElement;
};

type NotValidInput = { [k in keyof FormFields]: boolean };

interface FormProps {
  submitDisabled: boolean;
}
interface FormState {
  submitDisable: boolean;
  firstTry: boolean;
  notValid: NotValidInput;
  userCards: FormFields[];
  successMsg: boolean;
}

function validateForm(formValues: FormFields) {
  const notValid = {
    name: false,
    date: false,
    country: false,
    view: false,
    best: false,
    file: false,
  };
  const MIN_AGE = 2;
  let notValidCount = 0;
  const keysForm = Object.keys(formValues);
  for (const key of keysForm) {
    if (!formValues[key as keyof FormFields]) {
      notValid[key as keyof FormFields] = true;
      notValidCount += 1;
    }
  }
  if (formValues.date) {
    const today = new Date().getFullYear();
    const formYear = new Date(formValues.date).getFullYear();

    if (MIN_AGE > today - formYear) {
      notValid.date = true;
      notValidCount += 1;
    }
  }

  return { notValid, notValidCount };
}

class Form extends React.Component<FormProps, FormState> {
  form: React.RefObject<HTMLFormElement & FormField>;
  notValidCount: number;
  notValidInputMsg: FormFields | undefined = {
    name: 'fill in',
    date: 'under 2 years old',
    country: 'fill in',
    view: 'promise me',
    best: 'choose',
    file: 'download',
  };
  constructor(props: FormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form = React.createRef<HTMLFormElement & FormField>();
    this.notValidCount = 0;
    this.state = {
      notValid: {
        name: false,
        date: false,
        country: false,
        view: false,
        best: false,
        file: false,
      },
      submitDisable: true,
      firstTry: true,
      userCards: [],
      successMsg: false,
    };
  }

  newUserCard = (userCard: FormFields) => {
    this.setState((prevState) => {
      const userCards = prevState.userCards.slice();
      userCards.push(userCard);
      return { userCards };
    });
  };

  getFormValues = (): FormFields => {
    if (this.form.current?.elements) {
      return {
        name: (this.form.current?.elements.namedItem('name') as HTMLInputElement).value,
        date: (this.form.current?.elements.namedItem('date') as HTMLInputElement).value,
        country: (this.form.current?.elements.namedItem('country') as HTMLSelectElement).value,
        view: (this.form.current?.elements.namedItem('view') as HTMLInputElement).checked
          ? 'yes'
          : '',
        best: (this.form.current?.elements.namedItem('best') as HTMLInputElement).value,
        file: (this.form.current?.elements.namedItem('file') as HTMLInputElement).value,
      };
    }

    return {
      name: '',
      date: '',
      country: '',
      view: '',
      best: '',
      file: '',
    };
  };

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formValues = this.getFormValues();
    const { notValid, notValidCount } = validateForm(formValues);
    if (notValidCount) {
      this.notValidCount = notValidCount;
      this.setState({ notValid: notValid, submitDisable: true });
      return;
    }
    this.newUserCard(formValues);
    this.form.current?.reset();
    this.setState({ submitDisable: true, firstTry: true, successMsg: true });
    setTimeout(() => {
      this.setState({ successMsg: false });
    }, 1000);
  }

  resetNotValid: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    this.notValidCount -= 1;

    if (this.notValidCount === 0) {
      this.setState({ submitDisable: false });
    }
    this.setState((prevState) => {
      const notValid = prevState.notValid;
      const key = e.target.name;

      if (Object.hasOwn(notValid, key)) {
        notValid[key as keyof NotValidInput] = false;
      }

      return { notValid };
    });
  };

  submitEnable: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = () => {
    this.setState({ submitDisable: false, firstTry: false });
  };

  setHandler = (notValidInput: boolean, firstTry: boolean) => {
    return firstTry ? this.submitEnable : notValidInput ? this.resetNotValid : undefined;
  };

  render() {
    return (
      <>
        <div className={classes.createProduct}>
          <form onSubmit={this.handleSubmit} ref={this.form}>
            <div>fill the form...</div>
            <div>
              <input
                name="name"
                type="text"
                placeholder="name"
                onChange={this.setHandler(this.state.notValid.name, this.state.firstTry)}
              />
              <p>
                <>{this.state.notValid.name ? this.notValidInputMsg?.name : ''}</>
              </p>
            </div>
            <div>
              <input
                name="date"
                type="date"
                onChange={this.setHandler(this.state.notValid.date, this.state.firstTry)}
                title="test-date"
              />
              your date of birth
              <p>
                <>{this.state.notValid.date ? this.notValidInputMsg?.date : ''}</>
              </p>
            </div>
            <div>
              <select
                name="country"
                id=""
                onChange={this.setHandler(this.state.notValid.country, this.state.firstTry)}
              >
                <option value="">Country</option>
                <option value="Belarus">Belarus</option>
                <option value="Ireland">Ireland</option>
                <option value="México">México</option>
              </select>
              {'your country'}
              <p>
                <>{this.state.notValid.country ? this.notValidInputMsg?.country : ''}</>
              </p>
            </div>
            <div>
              <input
                name="view"
                type="checkbox"
                onChange={this.setHandler(this.state.notValid.view, this.state.firstTry)}
              />
              {'did you watch NARUTO?'}
              <p>
                <>{this.state.notValid.view ? this.notValidInputMsg?.view : ''}</>
              </p>
            </div>
            <div>
              <input
                name="best"
                value="Naruto"
                type="radio"
                onChange={this.setHandler(this.state.notValid.best, this.state.firstTry)}
              />
              Naruto
              <input
                name="best"
                value="Sasuke"
                type="radio"
                onChange={this.setHandler(this.state.notValid.best, this.state.firstTry)}
              />
              Sasuke
              <p>
                <>{this.state.notValid.best ? this.notValidInputMsg?.best : ''}</>
              </p>
            </div>
            <div>
              <input
                name="file"
                type="file"
                onChange={this.setHandler(this.state.notValid.file, this.state.firstTry)}
                title="test-file"
              />
              <p>
                <>{this.state.notValid.file ? this.notValidInputMsg?.file : ''}</>
              </p>
            </div>
            <div>
              <button type="submit" disabled={this.state.submitDisable} title="test-button">
                create
              </button>
            </div>
          </form>
        </div>
        {this.state.successMsg && (
          <div className={classes.msg}>
            <p>Data Added</p>
          </div>
        )}
        {this.state.userCards.map((card, index) => {
          return (
            <div className={classes.card} key={index}>
              <p>name: {card.name}</p>
              <p>birthday: {card.date}</p>
              <p>country: {card.country}</p>
              <p>he/she promises to watch NARUTO: {card.view}</p>
              <p>he/she thinks the best: {card.best}</p>
              <p>avatar link: {card.file}</p>
            </div>
          );
        })}
      </>
    );
  }
}

export default Form;
