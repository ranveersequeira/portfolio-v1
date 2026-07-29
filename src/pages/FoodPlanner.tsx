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

const STORAGE_KEY = "lean-meal-planner-v1";

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
    title: "Protein",
    items: [
      ["Eggs", "72–84"],
      ["Paneer", "2 kg"],
      ["Tofu", "1.5 kg"],
      ["Thick curd / Greek yogurt", "5 kg"],
      ["Milk", "10 L"],
      ["Soy chunks", "1 kg"],
      ["Mixed dals", "2 kg"],
      ["Rajma", "600 g"],
      ["Chickpeas", "600 g"],
      ["Roasted chana", "750 g"],
    ],
  },
  {
    title: "Carbs & staples",
    items: [
      ["Atta", "4 kg"],
      ["Rice", "3 kg"],
      ["Oats", "1.25 kg"],
      ["Whole-wheat bread", "3 loaves"],
      ["Besan", "750 g"],
      ["Idli batter", "1 kg"],
    ],
  },
  {
    title: "Produce",
    items: [
      ["Onion", "2 kg"],
      ["Tomato", "2 kg"],
      ["Cucumber", "1.5 kg"],
      ["Carrot", "1 kg"],
      ["Capsicum", "750 g"],
      ["Leafy greens", "1.5 kg"],
      ["Mixed vegetables", "4 kg"],
      ["Bananas", "18"],
      ["Apples / guava / oranges", "18"],
      ["Papaya", "1 large"],
      ["Lemon, ginger, garlic", "1 set"],
    ],
  },
  {
    title: "Snacks",
    items: [
      ["Peanuts", "500 g"],
      ["Almonds", "300 g"],
      ["Makhana", "300 g"],
      ["Chia / flaxseed", "250 g"],
      ["Buttermilk", "3 L"],
    ],
  },
];

const mealWeeks: MealWeek[] = [
  {
    name: "Week 1",
    focus: "Balanced start",
    days: [
      ["Monday", "Vegetable omelette, whole-wheat toast and fruit", "Rajma rice, cucumber salad and thick curd", "Roasted chana and buttermilk", "Paneer bhurji, rotis and mixed vegetables", "100–115 g"],
      ["Tuesday", "Overnight oats with milk, curd, chia and banana", "Soy-chunk pulao with vegetable raita", "Two boiled eggs per adult", "Palak tofu with rotis", "100–120 g"],
      ["Wednesday", "Besan chilla stuffed with paneer", "Chole, rotis, salad and curd", "Greek yogurt with fruit", "Egg curry, vegetables and rice", "105–120 g"],
      ["Thursday", "Tofu sandwich and milk", "Moong-dal khichdi with soy and curd", "Sprouts chaat with boiled egg", "Tofu stir-fry with rice", "100–115 g"],
      ["Friday", "Egg bhurji rolls", "Paneer rice bowl with vegetables", "Roasted chana, fruit and milk", "Mixed dal, rotis and sabzi", "100–115 g"],
      ["Saturday", "Savoury oats with eggs", "Soy keema, rotis and raita", "Curd with chia seeds", "Paneer tikka and sautéed vegetables", "105–125 g"],
    ],
  },
  {
    name: "Week 2",
    focus: "Higher-fibre week",
    days: [
      ["Monday", "Moong dal chilla with paneer filling", "Egg pulao with raita and salad", "Apple with thick curd", "Tofu curry, rotis and beans", "100–115 g"],
      ["Tuesday", "Masala oats with three eggs", "Rajma quinoa or rice bowl", "Roasted chana and buttermilk", "Soy chunk masala with rotis", "100–120 g"],
      ["Wednesday", "Greek-yogurt oats with fruit", "Paneer tikka wrap and salad", "Two boiled eggs", "Dal palak, rice and curd", "100–115 g"],
      ["Thursday", "Egg and paneer sandwich", "Chole rice bowl with cucumber", "Sprouts and lemon", "Tofu bhurji with rotis", "105–120 g"],
      ["Friday", "Besan omelette with curd", "Soy vegetable biryani and raita", "Milk and peanuts", "Egg curry with sautéed vegetables", "100–115 g"],
      ["Saturday", "Idli, sambar and boiled eggs", "Paneer pulao with salad", "Fruit yogurt bowl", "Mixed lentil soup and tofu salad", "100–115 g"],
    ],
  },
  {
    name: "Week 3",
    focus: "Meal-prep friendly",
    days: [
      ["Monday", "Overnight oats with yogurt and seeds", "Soy keema rice bowl", "Boiled eggs and fruit", "Paneer curry with rotis", "100–120 g"],
      ["Tuesday", "Egg bhurji toast", "Dal, rice, vegetables and curd", "Roasted chana", "Tofu tikka bowl", "100–115 g"],
      ["Wednesday", "Paneer besan chilla", "Rajma wrap with salad", "Greek yogurt", "Egg fried rice with vegetables", "105–120 g"],
      ["Thursday", "Savoury oats with tofu scramble", "Chole and rotis", "Buttermilk and peanuts", "Soy chunk curry with rice", "100–115 g"],
      ["Friday", "Three-egg vegetable omelette", "Paneer bhurji rice bowl", "Fruit and curd", "Moong dal, tofu and vegetables", "105–120 g"],
      ["Saturday", "Idli, sambar and eggs", "Egg biryani and raita", "Makhana and milk", "Light paneer salad with soup", "100–115 g"],
    ],
  },
  {
    name: "Week 4",
    focus: "Variety & repeatability",
    days: [
      ["Monday", "Egg-paneer breakfast wrap", "Soy pulao and raita", "Greek yogurt and banana", "Dal tadka, rotis and vegetables", "105–120 g"],
      ["Tuesday", "Oats, milk, yogurt and chia", "Paneer tikka rice bowl", "Two boiled eggs", "Tofu palak with rotis", "100–115 g"],
      ["Wednesday", "Besan chilla and curd", "Rajma rice and salad", "Roasted chana and fruit", "Egg curry and vegetables", "100–115 g"],
      ["Thursday", "Tofu scramble sandwich", "Chole, rotis and curd", "Milk and peanuts", "Soy keema stuffed rotis", "100–115 g"],
      ["Friday", "Masala omelette and toast", "Moong khichdi with paneer", "Sprouts chaat", "Tofu stir-fry and rice", "105–120 g"],
      ["Saturday", "Savoury oats with eggs", "Paneer pulao and raita", "Curd, fruit and seeds", "Mixed dal soup with egg salad", "100–115 g"],
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
            <p className="food-eyebrow">3 adults · Eggetarian · No chicken</p>
            <h1>
              Eat well.
              <br />
              Stay consistent.
            </h1>
            <p className="food-subtitle">
              A four-week lean-mass meal system. Daily meals appear first on
              mobile, while the reusable grocery checklist stays collapsible
              below.
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
