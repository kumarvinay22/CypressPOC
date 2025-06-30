Feature: Practice Test Login
  As a user
  I want to test the login functionality
  So that I can verify the application works correctly

  Background:
    Given I am on the practice test login page

  @smoke @navigation @sanity
  Scenario: Navigate to login page
    Then I should see the login form
    And the page title should contain "Test Login"

  @smoke @login @positive @regression
  Scenario: Successful login with valid credentials
    When I enter "student" as username
    And I enter "Password123" as password
    And I click the submit button
    Then I should be redirected to the success page
    And I should see "Congratulations" text

  @smoke @login @negative @regression
  Scenario: Failed login with incorrect password
    When I enter "student" as username
    And I enter "wrongpassword" as password
    And I click the submit button
    Then I should see an error message
    And I should remain on the login page

  @smoke @screenshot @negative
  Scenario: Check for non-existent element to test screenshots
    Given I am on the practice test login page
    When I enter "student" as username
    Then I should see the "profile" icon which does not exist

  @smoke @screenshot @negative
  Scenario: Another failure scenario for screenshot testing
    Given I am on the practice test login page
    When I enter "student" as username
    Then I should see the "admin" button which does not exist

  @smoke @screenshot @negative
  Scenario: Third failure scenario for screenshot testing
    Given I am on the practice test login page 
    When I enter "student" as username
    Then I should see the "settings" panel which does not exist
