Feature: Score board should have buttons to play/pause simulation

    Scenario: Clicking start button
        Given I am on the score board page
        When I click on "start button"
        Then Button should change text to Finish
        Then Simulation should start

    Scenario: Clicking finish button
        Given I am on the score board page
        When I click on "finish button"
        Then Button should change text to Restart
        Then Simulation should finish

    Scenario: Clicking restart button
        Given I am on the score board page
        When I click on "restart button"
        Then Button should change text to Finish
        Then Simulation should start