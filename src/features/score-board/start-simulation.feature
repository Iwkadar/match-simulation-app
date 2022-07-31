Feature: Start page should have start button to start simulation

    Scenario: Clicking start button
        Given I am on the start page
        When I click on "start button"
        Then Simulation should start