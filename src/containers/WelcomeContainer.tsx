import * as React from 'react';
import { RouterProps } from 'react-router';
import { Welcome } from '../components/Welcome';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IWelcomeContainerState {
  analytics: boolean;
}

export class WelcomeContainer extends React.Component<RouterProps, IWelcomeContainerState> {
  public state = {
    analytics: true,
  };

  public render = () => (
    <Welcome
      handleChange={this.handleChange}
      persistAnalytics={this.persistAnalytics}
      analytics={this.state.analytics}
    />
  );

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    this.setState({
      ...this.state,
      analytics: checked,
    });
  };

  private persistAnalytics = (event: React.FormEvent<HTMLFormElement>) => {
    localStorage.setItem('user_analytics', this.state.analytics.toString());
    this.props.history.push('/');
  };
}
