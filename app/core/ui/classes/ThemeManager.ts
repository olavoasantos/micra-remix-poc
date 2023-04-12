export class ThemeManager implements Application.ThemeManager {
  get colorScheme() {
    return this.configuration.get('ui.theme.colorScheme') as 'light' | 'dark';
  }

  get isSet() {
    return this.colorScheme != null;
  }

  get isLight() {
    return this.colorScheme === 'light';
  }

  get isDark() {
    return this.colorScheme === 'dark';
  }

  constructor(private readonly configuration: Micra.Configuration) {}

  toggleTheme() {
    this.configuration.set(
      'ui.theme.colorScheme',
      this.isLight || !this.isSet ? 'dark' : 'light',
    );
  }
}
