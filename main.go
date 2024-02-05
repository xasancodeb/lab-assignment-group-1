package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	fitnessLevels := []string{
		"Beginner",
		"Intermediate",
		"Advanced",
	}

	exercises := [][]string{
		{"Start your workout with a brisk walk for 20-30 minutes. Additionally, cycling or using the elliptical machine is beneficial for overall cardiovascular health."},
		{"Incorporate bodyweight exercises such as squats, lunges, and push-ups. Include dumbbell shoulder presses and seated rows to build strength. Plank holds for 15-30 seconds are great for core activation."},
		{"Advance your cardiovascular routine with jogging, stair climbing, or higher-intensity sessions on the elliptical machine lasting 30-45 minutes."},
		{"For advanced strength training, consider exercises like deadlifts, bench press, pull-ups, barbell squats, overhead press, dumbbell rows, and leg presses."},
		{"Engage in high-intensity interval training (HIIT), sprinting, or advanced spin classes for a challenging cardiovascular workout."},
		{"Take your strength training to the next level with Olympic lifts (Clean & Jerk, Snatch), squat variations, advanced plyometrics, heavy deadlifts, and advanced bodyweight movements."},
	}

	coreExercises := [][]string{
		{},
		{"For core activation, include exercises like Russian twists, leg raises, and bicycle crunches. Plank with shoulder taps, mountain climbers, and reverse crunches can also enhance your core workout."},
		{"Progress to hanging leg raises, dragon flags, woodchoppers, side plank with leg lift, medicine ball twists, and hollow body holds for advanced core strength."},
		{"Explore advanced core exercises such as dragon flags, windshield wipers, ab rollouts, plank variations (front, side, reverse), Russian twist with a medicine ball, and V-ups."},
		{"Challenge your core with hanging windshield wipers, barbell Russian twists, dragon flag progressions, toes-to-bar, and L-sit holds."},
		{"Include hanging leg raises with twists, barbell woodchoppers, windmills, Turkish get-ups, plank with row (Renegade rows), and ab wheel rollouts for a comprehensive core workout."},
	}

	flexibilityAndMobility := [][]string{
		{"Improve flexibility by stretching major muscle groups and practicing basic yoga poses. This will enhance joint mobility and overall range of motion."},
		{"Dynamically stretch and continue practicing yoga for improved mobility. Consider incorporating foam rolling and Pilates into your routine for enhanced flexibility."},
		{"Engage in advanced yoga poses for deep stretches, joint mobility exercises, dynamic stretching routines, and active isolated stretching for improved flexibility."},
		{"Incorporate Pilates for core stability, dynamic stretching routines, foam rolling, advanced yoga poses, and proprioceptive neuromuscular facilitation (PNF) stretching for increased flexibility."},
		{"Enhance flexibility with assisted stretching using resistance bands, myofascial release techniques, dynamic stretching routines, advanced yoga flows, and the practice of Tai Chi."},
		{"Take your flexibility to the next level with advanced PNF stretching, Yin Yoga, functional range conditioning (FRC), Gyrotonic exercises, and include elements of Capoeira for joint mobility."},
	}

	fmt.Println("Welcome to the Exercise Progression Guide for Different Fitness Levels!")
	fmt.Println("To get started, please choose your fitness level:")
	for i, level := range fitnessLevels {
		fmt.Printf("%d - %s\n", i+1, level)
	}

	var levelInput int
	fmt.Println("Enter the number corresponding to your fitness level (or 0 to exit):")
	fmt.Scan(&levelInput)

	if levelInput == 0 {
		fmt.Println("Exiting the Exercise Progression Guide. Keep up the great work!")
		return
	} else if levelInput < 1 || levelInput > len(fitnessLevels) {
		fmt.Println("Invalid input. Please restart the guide and select a valid option.")
		return
	}
	levelIndex := levelInput - 1

	fmt.Printf("Based on your fitness level (%s), here are recommended exercises:\n", fitnessLevels[levelIndex])

	src := rand.NewSource(time.Now().UnixMicro())
	r := rand.New(src)

	exerciseIndex := r.Intn(len(exercises[levelIndex]))
	chosenExercise := exercises[levelIndex][exerciseIndex]

	fmt.Printf("Your recommended exercise is: %s\n", chosenExercise)

	if len(coreExercises[levelIndex]) > 0 {
		fmt.Printf("Additional core exercise suggestions: %v\n", coreExercises[levelIndex])
	}

	fmt.Printf("For flexibility and mobility: %v\n", flexibilityAndMobility[levelIndex])

	fmt.Println("Thank you for using the Exercise Progression Guide! Keep striving for your fitness goals.")
}
