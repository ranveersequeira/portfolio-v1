import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronUp,
  ListChecks,
  Printer,
  RotateCcw,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import "./FoodPlanner.css";

const STORAGE_KEY = "lean-meal-planner-v2";

type GroceryGroup = {
  title: string;
  items: [name: string, quantity: string][];
};

type MealDay = [
  name: string,
  breakfast: string,
  lunch: string,
  snack: string,
  dinner: string,
  protein: string,
];

type MealWeek = {
  name: string;
  focus: string;
  days: MealDay[];
};

type WeekProgress = {
  orders: Record<string, boolean>;
  days: Record<string, boolean>;
};

type PlannerState = {
  weeks: WeekProgress[];
};

const groceryGroups: GroceryGroup[] = [
  {
    title: "Dairy & protein",
    items: [
      ["Eggs", "42–48"],
      ["Paneer", "1.5 kg"],
      ["Dahi / curd", "3 kg"],
      ["Milk", "7 L"],
      ["Soy chunks", "750 g"],
      ["Mixed dals", "1.5 kg"],
      ["Rajma", "500 g"],
      ["Kabuli chana", "500 g"],
      ["Kala chana", "500 g"],
      ["Roasted chana", "500 g"],
    ],
  },
  {
    title: "Grains & staples",
    items: [
      ["Atta", "4 kg"],
      ["Rice", "3 kg"],
      ["Poha", "750 g"],
      ["Suji / daliya", "750 g"],
      ["Besan", "750 g"],
      ["Idli / dosa batter", "1.5 kg"],
      ["Whole-wheat bread", "2 loaves"],
    ],
  },
  {
    title: "Vegetables & fruit",
    items: [
      ["Onion", "2 kg"],
      ["Tomato", "2 kg"],
      ["Potato", "1.5 kg"],
      ["Cucumber", "1.5 kg"],
      ["Carrot / beetroot", "1 kg"],
      ["Capsicum", "750 g"],
      ["Palak / methi", "1.5 kg"],
      ["Seasonal vegetables", "5 kg"],
      ["Bananas", "18"],
      ["Seasonal fruit", "18 pieces"],
      ["Lemon, chilli & coriander", "1 weekly set"],
      ["Ginger & garlic", "500 g"],
    ],
  },
  {
    title: "Kitchen & snacks",
    items: [
      ["Peanuts", "500 g"],
      ["Makhana", "300 g"],
      ["Fresh sprouts", "1 kg"],
      ["Buttermilk", "3 L"],
      ["Cooking oil", "1 L"],
      ["Ghee", "250 g"],
      ["Jeera, rai & hing", "1 refill set"],
      ["Haldi, mirch & dhania powder", "1 refill set"],
    ],
  },
];

const mealWeeks: MealWeek[] = [
  {
    name: "Week 1",
    focus: "Ghar ka balanced",
    days: [
      [
        "Monday",
        "Vegetable poha with two boiled eggs and fruit",
        "Rajma chawal, cucumber-onion salad and dahi",
        "Roasted chana and chaas",
        "Paneer bhurji, rotis and bhindi sabzi",
        "95–110 g",
      ],
      [
        "Tuesday",
        "Vegetable upma with dahi and peanuts",
        "Arhar dal, rice, aloo-beans sabzi and salad",
        "Two masala boiled eggs per adult",
        "Soy-chunk masala, rotis and kachumber",
        "95–115 g",
      ],
      [
        "Wednesday",
        "Besan chilla stuffed with paneer and green chutney",
        "Chole, jeera rice, salad and dahi",
        "Seasonal fruit with a glass of milk",
        "Egg curry, rotis and lauki-chana dal",
        "100–115 g",
      ],
      [
        "Thursday",
        "Idli, sambar and one boiled egg per adult",
        "Moong-dal khichdi, dahi, papad and salad",
        "Sprouts chaat with lemon",
        "Palak paneer and rotis",
        "95–110 g",
      ],
      [
        "Friday",
        "Egg bhurji, two rotis and fruit",
        "Masoor dal, rice, seasonal sabzi and dahi",
        "Peanuts, banana and chaas",
        "Soy keema, rotis and cucumber raita",
        "95–110 g",
      ],
      [
        "Saturday",
        "Masala dosa, sambar and egg podimas",
        "Kadhi chawal with kala-chana salad",
        "Roasted makhana and milk",
        "Matar paneer, rotis and carrot-beet salad",
        "100–115 g",
      ],
    ],
  },
  {
    name: "Week 2",
    focus: "Dal & seasonal sabzi",
    days: [
      [
        "Monday",
        "Moong-dal chilla with paneer filling and chutney",
        "Egg pulao, boondi raita and salad",
        "Guava or apple with roasted chana",
        "Mixed dal, rotis and gobhi-matar sabzi",
        "95–110 g",
      ],
      [
        "Tuesday",
        "Vegetable daliya with two boiled eggs",
        "Rajma chawal, dahi and onion salad",
        "Chaas and masala peanuts",
        "Soy-chunk curry, rotis and beans sabzi",
        "100–115 g",
      ],
      [
        "Wednesday",
        "Paneer paratha with dahi and fruit",
        "Chana dal, rice and lauki-tomato sabzi",
        "Two boiled eggs with chaat masala",
        "Palak egg curry and rotis",
        "95–110 g",
      ],
      [
        "Thursday",
        "Vegetable uttapam, sambar and coconut chutney",
        "Chole, rotis, cucumber salad and dahi",
        "Sprouts bhel with lemon",
        "Paneer-capsicum masala and rotis",
        "95–110 g",
      ],
      [
        "Friday",
        "Besan vegetable chilla with dahi",
        "Soy vegetable pulao and cucumber raita",
        "Banana, milk and peanuts",
        "Egg masala, rice and sautéed seasonal greens",
        "100–115 g",
      ],
      [
        "Saturday",
        "Idli, sambar and two boiled eggs",
        "Moong dal, rice, bhindi and salad",
        "Fruit dahi with roasted makhana",
        "Paneer tikka, rotis and mixed-vegetable soup",
        "100–115 g",
      ],
    ],
  },
  {
    name: "Week 3",
    focus: "Quick family cooking",
    days: [
      [
        "Monday",
        "Leftover-roti egg roll with onion and chutney",
        "Soy keema, rice and cucumber raita",
        "Boiled eggs and seasonal fruit",
        "Everyday paneer curry, rotis and salad",
        "100–115 g",
      ],
      [
        "Tuesday",
        "Egg bhurji with whole-wheat toast and milk",
        "Dal tadka, rice, cabbage-peas sabzi and dahi",
        "Roasted chana and chaas",
        "Kala-chana masala, rotis and kachumber",
        "95–110 g",
      ],
      [
        "Wednesday",
        "Paneer-besan chilla with coriander chutney",
        "Rajma chawal and carrot-cucumber salad",
        "Dahi, banana and peanuts",
        "Vegetable egg pulao and raita",
        "100–115 g",
      ],
      [
        "Thursday",
        "Poha with sprouts, peanuts and lemon",
        "Chole, rotis, salad and dahi",
        "Milk and roasted makhana",
        "Soy-chunk curry, rice and beans sabzi",
        "95–110 g",
      ],
      [
        "Friday",
        "Three-egg masala omelette with rotis",
        "Paneer bhurji, rice and mixed-vegetable salad",
        "Fruit, dahi and roasted chana",
        "Moong dal, rotis and seasonal sabzi",
        "100–115 g",
      ],
      [
        "Saturday",
        "Idli upma with sambar and boiled eggs",
        "Homestyle egg biryani and onion raita",
        "Chaas and masala peanuts",
        "Light paneer-do-pyaza, rotis and soup",
        "100–115 g",
      ],
    ],
  },
  {
    name: "Week 4",
    focus: "Regional favourites",
    days: [
      [
        "Monday",
        "Egg-paneer frankie in homemade rotis",
        "Soy pulao, raita and tomato-cucumber salad",
        "Dahi, banana and roasted chana",
        "Dal tadka, rotis and aloo-gobhi",
        "100–115 g",
      ],
      [
        "Tuesday",
        "Vegetable poha with boiled eggs and lemon",
        "Paneer tikka, jeera rice and green salad",
        "Chaas and masala peanuts",
        "Palak chana, rotis and dahi",
        "95–110 g",
      ],
      [
        "Wednesday",
        "Besan chilla, dahi and coriander chutney",
        "Rajma chawal and kachumber salad",
        "Seasonal fruit and milk",
        "Dhaba-style egg curry, rotis and beans sabzi",
        "100–115 g",
      ],
      [
        "Thursday",
        "Suji cheela with paneer and vegetables",
        "Chole, rotis, onion salad and dahi",
        "Sprouts chaat with lemon",
        "Soy keema stuffed parathas and raita",
        "100–115 g",
      ],
      [
        "Friday",
        "Masala omelette, rotis and fruit",
        "Moong-dal khichdi with paneer, dahi and papad",
        "Roasted makhana and chaas",
        "Sambar rice with egg podimas and poriyal",
        "100–115 g",
      ],
      [
        "Saturday",
        "Vegetable dosa, sambar and boiled eggs",
        "Paneer pulao, cucumber raita and salad",
        "Dahi, fruit and peanuts",
        "Mixed-dal soup, egg chaat and rotis",
        "100–115 g",
      ],
    ],
  },
];

const emptyWeek = (): WeekProgress => ({ orders: {}, days: {} });

const emptyPlanner = (): PlannerState => ({
  weeks: mealWeeks.map(emptyWeek),
});

function loadPlanner(): PlannerState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyPlanner();

    const parsed = JSON.parse(stored) as Partial<PlannerState>;
    if (!Array.isArray(parsed.weeks)) return emptyPlanner();

    return {
      weeks: mealWeeks.map((_, index) => {
        const progress = parsed.weeks?.[index];
        return {
          orders:
            progress?.orders && typeof progress.orders === "object"
              ? progress.orders
              : {},
          days:
            progress?.days && typeof progress.days === "object"
              ? progress.days
              : {},
        };
      }),
    };
  } catch {
    return emptyPlanner();
  }
}

const groceryId = (groupIndex: number, itemIndex: number) =>
  `g${groupIndex}-i${itemIndex}`;

const allGroceryIds = groceryGroups.flatMap((group, groupIndex) =>
  group.items.map((_, itemIndex) => groceryId(groupIndex, itemIndex)),
);

function FoodPlanner() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [planner, setPlanner] = useState<PlannerState>(loadPlanner);
  const [orderVisible, setOrderVisible] = useState(false);
  const [message, setMessage] = useState("");
  const orderPanelRef = useRef<HTMLElement>(null);
  const orderButtonRef = useRef<HTMLButtonElement>(null);
  const messageTimerRef = useRef<number | undefined>(undefined);

  const showMessage = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
    window.clearTimeout(messageTimerRef.current);
    messageTimerRef.current = window.setTimeout(() => setMessage(""), 2400);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    const previousThemeColor = themeColor?.content;

    document.title = "Lean Meal Planner";
    if (themeColor) themeColor.content = "#f3f1e8";

    return () => {
      document.title = previousTitle;
      if (themeColor && previousThemeColor) {
        themeColor.content = previousThemeColor;
      }
      window.clearTimeout(messageTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!orderVisible) return;
    orderPanelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [orderVisible]);

  const week = mealWeeks[activeWeek];
  const progress = planner.weeks[activeWeek] ?? emptyWeek();

  const summary = useMemo(() => {
    const completedOrders = allGroceryIds.filter(
      (id) => progress.orders[id],
    ).length;
    const completedDays = week.days.filter(
      (_, index) => progress.days[index],
    ).length;
    const totalTasks = allGroceryIds.length + week.days.length;

    return {
      completedOrders,
      completedDays,
      percentage: Math.round(
        ((completedOrders + completedDays) / totalTasks) * 100,
      ),
    };
  }, [progress, week]);

  const persistPlanner = useCallback(
    (nextPlanner: PlannerState) => {
      setPlanner(nextPlanner);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlanner));
      } catch {
        showMessage("Could not save progress in this browser.");
      }
    },
    [showMessage],
  );

  const updateWeek = useCallback(
    (nextProgress: WeekProgress) => {
      persistPlanner({
        ...planner,
        weeks: planner.weeks.map((value, index) =>
          index === activeWeek ? nextProgress : value,
        ),
      });
    },
    [activeWeek, persistPlanner, planner],
  );

  const toggleGrocery = (id: string, checked: boolean) => {
    updateWeek({
      ...progress,
      orders: { ...progress.orders, [id]: checked },
    });
  };

  const toggleDay = (dayIndex: number) => {
    updateWeek({
      ...progress,
      days: {
        ...progress.days,
        [dayIndex]: !progress.days[dayIndex],
      },
    });
  };

  const toggleAllGroceries = () => {
    const shouldCheck =
      summary.completedOrders !== allGroceryIds.length;
    updateWeek({
      ...progress,
      orders: Object.fromEntries(
        allGroceryIds.map((id) => [id, shouldCheck]),
      ),
    });
  };

  const resetWeek = () => {
    if (!window.confirm(`Reset all ticks for ${week.name}?`)) return;
    updateWeek(emptyWeek());
    showMessage(`${week.name} was reset.`);
  };

  const resetAll = () => {
    if (!window.confirm("Reset every week and remove all saved ticks?")) return;
    persistPlanner(emptyPlanner());
    showMessage("All planner data was reset.");
  };

  const closeOrder = () => {
    setOrderVisible(false);
    window.requestAnimationFrame(() => {
      orderButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      orderButtonRef.current?.focus({ preventScroll: true });
    });
  };

  return (
    <div className="food-planner" data-testid="food-meal-planner">
      <main className="food-app">
        <header className="food-header">
          <div className="food-intro">
            <p className="food-eyebrow">
              3 adults · Indian eggetarian home · No chicken
            </p>
            <h1>
              Eat well.
              <br />
              Stay consistent.
            </h1>
            <p className="food-subtitle">
              A four-week Indian household meal system built around familiar
              staples, seasonal sabzi and repeatable home cooking. Daily meals
              appear first on mobile, with the weekly grocery list below.
            </p>
          </div>

          <div className="food-header-actions" aria-label="Planner actions">
            <button
              ref={orderButtonRef}
              className="food-button food-button-primary"
              type="button"
              aria-expanded={orderVisible}
              aria-controls="weekly-order"
              onClick={() => setOrderVisible(true)}
            >
              <ShoppingBasket aria-hidden="true" size={17} />
              Show weekly order
            </button>
            <button
              className="food-button"
              type="button"
              onClick={() => window.print()}
            >
              <Printer aria-hidden="true" size={16} />
              Print week
            </button>
            <button
              className="food-button food-button-danger"
              type="button"
              onClick={resetWeek}
            >
              <RotateCcw aria-hidden="true" size={16} />
              Reset this week
            </button>
            <button
              className="food-button food-button-danger"
              type="button"
              onClick={resetAll}
            >
              <Trash2 aria-hidden="true" size={16} />
              Reset all data
            </button>
          </div>
        </header>

        <nav className="food-week-tabs" aria-label="Select meal-plan week">
          {mealWeeks.map((mealWeek, index) => (
            <button
              className={`food-week-tab${index === activeWeek ? " active" : ""}`}
              type="button"
              aria-current={index === activeWeek ? "page" : undefined}
              key={mealWeek.name}
              onClick={() => {
                setActiveWeek(index);
                setOrderVisible(false);
              }}
            >
              <span>{mealWeek.name}</span>
              <small>{mealWeek.focus}</small>
            </button>
          ))}
        </nav>

        <section className="food-summary-grid" aria-label={`${week.name} progress`}>
          <article className="food-summary-card food-summary-primary">
            <div>
              <p className="food-summary-label">Weekly completion</p>
              <p className="food-summary-value">{summary.percentage}%</p>
            </div>
            <div
              className="food-progress-track"
              role="progressbar"
              aria-label="Weekly completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={summary.percentage}
            >
              <div
                className="food-progress-bar"
                style={{ width: `${summary.percentage}%` }}
              />
            </div>
          </article>
          <article className="food-summary-card">
            <ListChecks className="food-summary-icon" aria-hidden="true" />
            <div>
              <p className="food-summary-label">Order items</p>
              <p className="food-summary-value">
                {summary.completedOrders}{" "}
                <span>/ {allGroceryIds.length}</span>
              </p>
            </div>
          </article>
          <article className="food-summary-card">
            <Check className="food-summary-icon" aria-hidden="true" />
            <div>
              <p className="food-summary-label">Meal days</p>
              <p className="food-summary-value">
                {summary.completedDays} <span>/ {week.days.length}</span>
              </p>
            </div>
          </article>
        </section>

        <section
          className={`food-layout${orderVisible ? " order-open" : ""}`}
        >
          <section
            className="food-days"
            aria-label={`${week.name} meal schedule`}
          >
            {week.days.map(
              ([name, breakfast, lunch, snack, dinner, protein], dayIndex) => {
                const done = Boolean(progress.days[dayIndex]);
                const meals = [
                  ["Breakfast", breakfast],
                  ["Lunch", lunch],
                  ["Snack", snack],
                  ["Dinner", dinner],
                ];

                return (
                  <article
                    className={`food-day-card${done ? " done" : ""}`}
                    key={name}
                  >
                    <div className="food-day-head">
                      <h2>{name}</h2>
                      <button
                        className="food-day-status"
                        type="button"
                        aria-pressed={done}
                        onClick={() => toggleDay(dayIndex)}
                      >
                        {done ? (
                          <>
                            <Check aria-hidden="true" size={15} />
                            Completed
                          </>
                        ) : (
                          "Mark complete"
                        )}
                      </button>
                    </div>

                    <dl className="food-meals">
                      {meals.map(([label, meal]) => (
                        <div className="food-meal" key={label}>
                          <dt>{label}</dt>
                          <dd>{meal}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="food-note">
                      <strong>Daily guide:</strong> {protein} protein per adult.
                      Adjust roti/rice, oil and serving sizes to each person’s
                      calorie target.
                    </p>
                  </article>
                );
              },
            )}
          </section>

          <aside
            ref={orderPanelRef}
            className="food-order-panel"
            id="weekly-order"
            aria-label={`${week.name} grocery order`}
            hidden={!orderVisible}
          >
            <div className="food-panel-head">
              <div>
                <p className="food-panel-kicker">{week.name}</p>
                <h2>Weekly order</h2>
                <p>Tap items after ordering</p>
              </div>
              <div className="food-panel-actions">
                <button
                  className="food-button"
                  type="button"
                  onClick={toggleAllGroceries}
                >
                  {summary.completedOrders === allGroceryIds.length
                    ? "Unmark all"
                    : "Mark all"}
                </button>
                <button
                  className="food-icon-button"
                  type="button"
                  aria-label="Hide weekly order"
                  onClick={closeOrder}
                >
                  <ChevronUp aria-hidden="true" size={19} />
                </button>
              </div>
            </div>

            <div className="food-order-list">
              {groceryGroups.map((group, groupIndex) => (
                <fieldset className="food-category" key={group.title}>
                  <legend>{group.title}</legend>
                  {group.items.map(([name, quantity], itemIndex) => {
                    const id = groceryId(groupIndex, itemIndex);
                    const checked = Boolean(progress.orders[id]);
                    const inputId = `food-${activeWeek}-${id}`;

                    return (
                      <label
                        className={`food-check-row${checked ? " checked" : ""}`}
                        htmlFor={inputId}
                        key={id}
                      >
                        <input
                          id={inputId}
                          name={`week-${activeWeek}-groceries`}
                          type="checkbox"
                          checked={checked}
                          onChange={(event) =>
                            toggleGrocery(id, event.target.checked)
                          }
                        />
                        <span className="food-item-name">{name}</span>
                        <span className="food-quantity">{quantity}</span>
                      </label>
                    );
                  })}
                </fieldset>
              ))}
            </div>
          </aside>
        </section>
      </main>

      <div
        className={`food-storage-message${message ? " show" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </div>
  );
}

export default FoodPlanner;
