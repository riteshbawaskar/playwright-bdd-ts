Feature: UI Control Validation for Employee Form

  Background:
    Given I am logged into the application

  Scenario: Validate mandatory and visible fields
    Given I am on the "employee" page
    Then the following fields should be visible:
      | Field Name      | Selector     |
      | Employee Name   | #empName     |
      | Department      | #department  |
    And the field "Employee Name" should be required with message "Name is required"

  Scenario: Validate dropdown and conditional visibility
    Given I am on the "employee" page
    When I check the select field "Department"
    Then it should contain the following options:
      | HR |
      | IT |
      | Finance |
    When I select "IT" from "Department"
    Then the following fields should be visible:
      | Field Name    | Selector          |
      | Tech Skills   | #techSkillSection |
