Feature: Account Opening
  As a user, I want to interact with the Automation Practice page

  Scenario: Click on 'Login'
    Given I am on "https://rahulshettyacademy.com/AutomationPractice/"
    When I click on "Login"
    Then I should see the result

  @v8
  Scenario: Click on 'Signup'
    Given I am on "https://rahulshettyacademy.com/AutomationPractice/"
    When I click on "Signup"
    Then I should see the result
