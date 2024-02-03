package lab_assignment_group_1

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	stages := []string{
		"early planning (1-6 months in)",
		"midway through planning (7-12 months in)",
		"final stages of planning (less than a month away)",
	}

	activities := [][]string{
		{
			"Choosing your wedding theme and colors",
			"Tasting sessions with potential caterers",
			"Venue scouting for the ceremony and reception",
		},
		{
			"DIY wedding invitation design workshop",
			"Wedding dress and suit fitting day",
			"Playlist creation for ceremony and reception",
		},
		{
			"DIY centerpiece and decoration making session",
			"Final walkthrough of the wedding day timeline",
			"Confirming final details with all vendors",
		},
	}

	tips := [][]string{
		{
			"Create a mood board to visualize your theme and color palette.",
			"Rate each dish based on flavor, presentation, and uniqueness.",
			"Take photos and notes on each venue's pros and cons for comparison.",
		},
		{
			"Gather inspiration and use design software or templates for a personal touch.",
			"Bring a trusted friend or family member for honest feedback and support.",
			"Include a mix of genres and eras to cater to all guests' musical tastes.",
		},
		{
			"Collect materials from craft stores or nature for unique, personal touches.",
			"Discuss each moment with your partner and vendors to ensure smooth execution.",
			"Review contracts and confirmations to avoid last-minute surprises.",
		},
	}

	fmt.Println("Welcome to the Wedding Planner's Ultimate Preparation Game!")
	fmt.Println("To get started, please tell us how far along you are in your wedding planning journey:")

	for i, stage := range stages {
		fmt.Printf("%d - %s\n", i+1, stage)
	}

	var stageInput int

	fmt.Println("Enter the number corresponding to your stage (or 0 to exit):")
	fmt.Scan(&stageInput)

	if stageInput == 0 {
		fmt.Println("Exiting the Wedding Planner's Game. Happy planning!")
		return
	} else if stageInput < 1 || stageInput > len(stages) {
		fmt.Println("Invalid input. Please restart the game and select a valid option.")
		return
	}
	stageIndex := stageInput - 1

	fmt.Printf("Based on your selection, here are activities suitable for %s:\n", stages[stageIndex])

	src := rand.NewSource(time.Now().UnixNano())
	r := rand.New(src)
	activityIndex := r.Intn(len(activities[stageIndex]))
	chosenActivity := activities[stageIndex][activityIndex]

	fmt.Printf("Your recommended activity is: %s.\n", chosenActivity)
	fmt.Println("Professional Tip:", tips[stageIndex][activityIndex])
	fmt.Println("Thank you for using the Wedding Planner's Game! Wishing you a beautiful journey to your big day.")
}
