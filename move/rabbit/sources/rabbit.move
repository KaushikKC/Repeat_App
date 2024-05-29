module rabbit::rabbit {
    use std::string;
    use sui::object::UID;
    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance};
    use sui::tx_context::TxContext;
    use sui::address;
    use sui::sui::SUI;
    use sui::transfer;
    use std::vector;
    use sui::table::{Table, Self};

    public struct Habit has key, store {
        id: UID,
        name: vector<u8>,
        goal: u64,
        target: u64,
        remainder: u64,
        points: u64,
    }

    public struct Challenge has key, store {
        id: UID,
        name: vector<u8>,
        total_stack_amount: Balance<SUI>,
        per_person_stake: u64,
        participants: vector<address>,
        stakes: vector<u64>,
        habits_included: vector<vector<u8>>,
        completed: bool,
    }

    public struct Habitude has key, store {
        id: UID,
        owner: address,
        habits: vector<Habit>,
        general_habits: vector<Habit>,
        user_points: u64,
        challenges: vector<Challenge>,
    }

    const EINDEX_OUT_OF_BOUNDS: u64 = 131072;
    const EINSUFFICIENT_STAKE: u64 = 12;

    public fun initialize(ctx: &mut TxContext) {
        let mut habitude = Habitude {
            id: object::new(ctx),
            owner: ctx.sender(),
            habits: vector::empty(),
            general_habits: vector::empty(),
            user_points: 0,
            challenges: vector::empty(),
        };

        vector::push_back(&mut habitude.general_habits, Habit {
            id: object::new(ctx),
            name: b"Walking",
            goal: 30,
            target: 30,
            remainder: 0,
            points: 10,
        });

        vector::push_back(&mut habitude.general_habits, Habit {
            id: object::new(ctx),
            name: b"drinking_water",
            goal: 8,
            target: 8,
            remainder: 0,
            points: 5,
        });

        vector::push_back(&mut habitude.general_habits, Habit {
            id: object::new(ctx),
            name: b"Sleeping",
            goal: 8,
            target: 8,
            remainder: 0,
            points: 5,
        });

        vector::push_back(&mut habitude.general_habits, Habit {
            id: object::new(ctx),
            name: b"Coding",
            goal: 6,
            target: 6,
            remainder: 5,
            points: 10,
        });

        transfer::transfer(habitude,tx_context::sender(ctx));
    }

    public fun create_habit(account: &signer, name: vector<u8>, goal: u64, target: u64, remainder: u64, points: u64,habitude: &mut Habitude,ctx: &mut TxContext) {
        let habit = Habit {id:object::new(ctx), name: name, goal: goal, target: target, remainder: remainder, points: points };
        let general_habit = Habit {
        id: object::new(ctx),
        name: habit.name,
        goal: habit.goal,
        target: habit.target,
        remainder: habit.remainder,
        points: habit.points
    };
        vector::push_back(&mut habitude.habits, habit);
        vector::push_back(&mut habitude.general_habits, general_habit);
    }

    public fun create_challenge(
        name: vector<u8>,
        per_person_stake: u64,
        habits_included: vector<vector<u8>>,
        coin: Coin<SUI>,
        habitude: &mut Habitude,
        ctx: &mut TxContext
    ) {
        assert!(coin.value() == per_person_stake, EINSUFFICIENT_STAKE);

        // Convert the user's coin into a balance
        let staked_balance = coin.into_balance();

        let challenge = Challenge {
            id: object::new(ctx),
            name: name,
            total_stack_amount: staked_balance,
            per_person_stake: per_person_stake,
            participants: vector::singleton(ctx.sender()),
            stakes: vector::singleton(per_person_stake),
            habits_included: habits_included,
            completed: false,
        };
        vector::push_back(&mut habitude.challenges, challenge);
    }

    public fun complete_habit(account: &signer, habit_name: vector<u8>,habitude: &mut Habitude,ctx: &mut TxContext) {
        let mut i = 0;
        while (i < vector::length(&habitude.habits)) {
            let mut habit = &mut habitude.habits[i];
            if (habit.name == habit_name) {
                habit.remainder = 0;
                break;
            };
            i = i + 1;
        }
    }

    public fun complete_challenge(challenge_name: vector<u8>,habitude: &mut Habitude,ctx: &mut TxContext) {

        let mut i = 0;
        while (i < vector::length(&habitude.challenges)) {
            let mut challenge = &mut habitude.challenges[i];
            if (challenge.name == challenge_name) {
                challenge.completed = true;
                break;
            };
            i = i + 1;
        }
    }

    public fun get_challenge_participants(challenge_name: vector<u8>,habitude: &mut Habitude,ctx: &mut TxContext): vector<address> {
        let mut i = 0;
        while (i < vector::length(&habitude.challenges)) {
            let challenge = &habitude.challenges[i];
            if (challenge.name == challenge_name) {
                return challenge.participants;
            };
            i = i + 1;
        };

        return vector::empty<address>()
    }

    public fun join_challenge(
        challenge_name: vector<u8>,
        stake_amount: u64,
        habitude: &mut Habitude,
        ctx: &mut TxContext,
        coin: &mut coin::Coin<SUI>,
    ) {

        let mut i = 0;
        while (i < vector::length(&habitude.challenges)) {
            let mut challenge = &mut habitude.challenges[i];
            if (challenge.name == challenge_name) {
                assert!(!vector::contains(&challenge.participants, &ctx.sender()), 0);
                assert!(stake_amount == challenge.per_person_stake, 1);

                // Convert the user's coin into a balance
                 let coins_to_invest = coin::split(coin, stake_amount, ctx);
                let staked_balance = coin::into_balance(coins_to_invest);

            // Update the total stake amount
            balance::join(&mut challenge.total_stack_amount, staked_balance);


                vector::push_back(&mut challenge.participants, ctx.sender());
                vector::push_back(&mut challenge.stakes, stake_amount);
                break;
            };
            i = i + 1;
        }
    }

    public fun claim_points_for_habit( habitude: &mut Habitude, habit_name: vector<u8>) {
        let mut i = 0;
        while (i < vector::length(&habitude.habits)) {
            let mut habit = &mut habitude.habits[i];
            if (habit.name == habit_name && habit.remainder == 0) {
                habitude.user_points = habitude.user_points + habit.points
            }
        }
    }


    public fun set_element_at<T: store>(v: &mut vector<T>, i: u64, e: T) {
        let len = vector::length(v);
        // Check if the index is within bounds
        if (i >= len) {
            abort EINDEX_OUT_OF_BOUNDS;
        };

        // Insert the new element at the end
        vector::push_back(v, e);

        // Swap elements to move the new element to the correct index
        let mut j = len;
        while (j > i) {
            vector::swap(v, j, j - 1);
            j = j - 1;
        };
    }

    public fun claim_staked_amount(challenge_name: vector<u8>,habitude: &mut Habitude,ctx: &mut TxContext) {

        let mut i = 0;
    while (i < vector::length(& habitude.challenges)) {
        let challenge = &mut habitude.challenges[i];
        if (challenge.name == challenge_name && challenge.completed) {
            let total_completed_participants = vector::length(&challenge.participants) as u64;
            let total_staked_amount = balance::value(&challenge.total_stack_amount);
            assert!(total_staked_amount > 0, 2);

            let split_amount = total_staked_amount / total_completed_participants;
            let coin_to_transfer = coin::take(&mut challenge.total_stack_amount, split_amount, ctx);

            transfer::public_transfer(coin_to_transfer, ctx.sender());

            let mut j = 0;
            while (j < vector::length(&challenge.participants)) {
                if (challenge.participants[j] == ctx.sender()) {
                    set_element_at(&mut challenge.stakes, j, 0);
                };
                j = j + 1;
            }
        };
        i = i + 1;
    }
}
}