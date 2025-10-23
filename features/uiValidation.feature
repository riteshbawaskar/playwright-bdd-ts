Feature: Application UI Validation
  As a user
  I want to verify UI controls and dropdown values
  So that I can ensure the application works correctly

  Background: User Login
    Given user is logged into the application

  Scenario: Verify control visibility on dashboard
    Then user should see the "#dashboard-header" control
    And user should see the "#user-profile" control
    And user should see the "#navigation-menu" control
    And the "#submit-button" control should be enabled

  Scenario: Verify button is disabled when form is empty
    When user navigates to "https://your-application-url.com/form"
    Then the "#submit-button" control should be disabled
    When user enters "Test Data" in "#name-field" field
    Then the "#submit-button" control should be enabled

  Scenario: Validate dropdown options
    When user navigates to "https://your-application-url.com/settings"
    Then the "#country-dropdown" dropdown should contain the following options:
      | USA     |
      | Canada  |
      | UK      |
      | Germany |
    And the "#country-dropdown" dropdown should have 4 options

  Scenario: Verify text content on page
    Then user should see the "#welcome-message" control
    And the "#welcome-message" control should have text "Welcome"

  Scenario: Select dropdown value and verify
    When user navigates to "https://your-application-url.com/settings"
    And user selects "USA" from "#country-dropdown" dropdown
    Then the "#country-dropdown" dropdown should have "USA" selected

  Scenario: Verify multiple controls visibility
    Then user should see the "#header" control
    And user should see the "#footer" control
    And user should see the "#sidebar" control
    And user should not see the "#admin-panel" control
