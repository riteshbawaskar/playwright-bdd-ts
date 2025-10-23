Feature: Dropdown Validation Tests
  As a user
  I want to validate dropdown controls
  So that I can ensure correct options are available

  Background: User Login
    Given user is logged into the application

  Scenario: Validate country dropdown contains all expected options
    When user navigates to "https://your-application-url.com/profile"
    Then the "#country-dropdown" dropdown should contain the following options:
      | USA           |
      | Canada        |
      | United Kingdom|
      | Germany       |
      | France        |

  Scenario: Select country and verify selection
    When user navigates to "https://your-application-url.com/profile"
    And user selects "Canada" from "#country-dropdown" dropdown
    Then the "#country-dropdown" dropdown should have "Canada" selected

  Scenario: Verify dropdown option count
    When user navigates to "https://your-application-url.com/settings"
    Then the "#language-dropdown" dropdown should have 5 options

  Scenario: Verify specific option exists in dropdown
    When user navigates to "https://your-application-url.com/settings"
    Then the "#timezone-dropdown" dropdown should contain option "EST"
    And the "#timezone-dropdown" dropdown should contain option "PST"

  Scenario: Select dropdown by label
    When user navigates to "https://your-application-url.com/settings"
    And user selects option with label "English (US)" from "#language-dropdown" dropdown
    Then the "#confirmation-message" control should have text "Language updated"
