import { RoomCostShot } from '../components/roomcost/RoomCostShot'
import { RoomCostWorkflow } from '../components/roomcost/RoomCostWorkflow'
import { MetalButton } from '../components/MetalButton'
import { homeSectionTo } from '../routes'

const base = `${import.meta.env.BASE_URL}cases/roomcost`

export default function CaseRoomCost() {
  return (
    <article className="case-page case-page--roomcost">
      <section className="case-section rc-hero !mt-0">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
        </div>

        <div className="rc-hero__grid">
          <div>
            <p className="rc-hero__kicker">CASE · Mobile estimation workflow</p>
            <h1 className="case-title">
              Clarity before
              <br />
              <span className="rc-hero__accent">renovation chaos</span>
            </h1>
            <p className="case-lead">
              A field-ready mobile system for room-area and budget estimation — structured, calm, and
              built for decisions before work starts.
            </p>
            <p className="case-sublead">
              Practical intelligence. Not a spreadsheet. Not a luxury pitch deck.
            </p>
          </div>

          <RoomCostShot
            src={`${base}/roomcost-banner.jpg`}
            alt="RoomCost — product banner"
            caption="Product"
            step="Mobile-first"
            variant="banner"
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">01</div>
        <h2 className="case-section-title">Situation</h2>

        <p className="rc-statement">
          Renovation planning starts with a number — but most people still build that number in notes,
          memory, and repeated mental math.
        </p>

        <div className="rc-cards rc-cards--2">
          <div className="rc-card">
            <p className="rc-card__label">Early estimate</p>
            <p className="rc-card__text">
              Homeowners and contractors need cost orientation before materials, crews, and timelines
              lock in.
            </p>
          </div>
          <div className="rc-card">
            <p className="rc-card__label">On-site reality</p>
            <p className="rc-card__text">
              Measurements happen in rooms, not desktops. The tool has to work where the work will
              happen.
            </p>
          </div>
        </div>

        <p className="rc-lead-line">
          The gap was not missing math — it was missing a{' '}
          <strong>structured workflow</strong> people could trust on first pass.
        </p>
      </section>

      <section className="case-section">
        <div className="case-label">02</div>
        <h2 className="case-section-title">Friction</h2>

        <p className="rc-statement">
          Manual estimation creates error loops: every recalculation erodes confidence, especially
          across multiple rooms.
        </p>

        <div className="rc-cards rc-cards--3">
          {[
            {
              label: 'Fragmented input',
              text: 'Dimensions scattered across notes, chats, and memory.',
            },
            {
              label: 'Hidden formulas',
              text: 'Area logic lives in heads — openings and slopes get skipped.',
            },
            {
              label: 'Trust breakdown',
              text: 'One wrong wall figure forces a full manual redo.',
            },
          ].map((item) => (
            <div key={item.label} className="rc-card">
              <p className="rc-card__label">{item.label}</p>
              <p className="rc-card__text">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="rc-lead-line">
          People needed a fast path from <strong>dimensions → verified number</strong>, not another
          calculator with exposed formulas.
        </p>
      </section>

      <section className="case-section">
        <div className="case-label">03</div>
        <h2 className="case-section-title">Estimation workflow</h2>

        <div className="rc-pair rc-pair--wide-right">
          <div>
            <p className="rc-statement !mb-6">
              Input stays minimal. The system carries wall logic, deductions, and totals — so the user
              focuses on the room, not the spreadsheet.
            </p>
            <div className="rc-cards rc-cards--2">
              <div className="rc-card">
                <p className="rc-card__label">Input</p>
                <p className="rc-card__text">Room dimensions and cost per m² — one screen, one flow.</p>
              </div>
              <div className="rc-card">
                <p className="rc-card__label">Process</p>
                <p className="rc-card__text">
                  Areas computed in sequence; openings and slope applied before the total.
                </p>
              </div>
            </div>
            <RoomCostWorkflow />
          </div>

          <RoomCostShot
            src={`${base}/roomcost-form-dark.jpg`}
            alt="RoomCost — dimension input"
            caption="Dimension input"
            step="Step 01"
            guides
          />
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">04</div>
        <h2 className="case-section-title">Validation logic</h2>

        <p className="rc-statement">
          Each stage exposes what changed — wall area, deducted openings, adjusted surfaces — so the
          estimate feels inspectable, not magical.
        </p>

        <div className="rc-phones">
          <RoomCostShot
            src={`${base}/roomcost-form-light.jpg`}
            alt="RoomCost — input form (light)"
            caption="Form state"
            step="Verify inputs"
            guides
          />
          <RoomCostShot
            src={`${base}/roomcost-openings-light.jpg`}
            alt="RoomCost — openings module"
            caption="Openings"
            step="Deduct & adjust"
            guides
          />
        </div>

        <div className="rc-cards rc-cards--2 mt-8 max-w-3xl">
          <div className="rc-card">
            <p className="rc-card__label">Verification</p>
            <p className="rc-card__text">
              Users see intermediate values before committing to a total — fewer silent mistakes.
            </p>
          </div>
          <div className="rc-card">
            <p className="rc-card__label">Field rhythm</p>
            <p className="rc-card__text">
              Light UI for bright rooms; dark UI for focus. Same logic, calmer contrast.
            </p>
          </div>
        </div>
      </section>

      <section className="case-section">
        <div className="case-label">05</div>
        <h2 className="case-section-title">Result clarity</h2>

        <div className="rc-pair rc-pair--wide-right">
          <div>
            <p className="rc-statement !mb-6">
              The output is a single legible total — budget orientation you can share before renovation
              spend becomes irreversible.
            </p>
            <p className="rc-lead-line !mt-0">
              <strong>Input → process → verification → confidence.</strong> The sequence is visible end
              to end.
            </p>
          </div>

          <RoomCostShot
            src={`${base}/roomcost-result-dark.jpg`}
            alt="RoomCost — total result"
            caption="Final estimate"
            step="Ready to share"
            variant="result"
          />
        </div>
      </section>

      <section className="case-section case-finale">
        <div className="case-label">06</div>
        <h2 className="case-section-title">Reduced renovation stress</h2>

        <div className="rc-outcomes">
          {[
            'Fewer calculation mistakes across rooms',
            'Calmer preparation before contractors arrive',
            'Confidence in the first number, not the fifth revision',
            'Less manual recalculation and cognitive load',
          ].map((text) => (
            <div key={text} className="rc-outcome-item">
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="rc-finale">
          <p className="rc-finale__headline">
            A practical mobile system that turns renovation estimation from stressful manual chaos into
            a calm structured workflow.
          </p>
          <p className="rc-finale__sub">
            Not only budget clarity — fewer errors, clearer preparation, and a number you can stand
            behind before work begins.
          </p>
          <div className="rc-finale__list">
            {['Field-ready', 'Workflow-first', 'Quiet confidence'].map((tag) => (
              <span key={tag} className="rc-finale__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <MetalButton to={homeSectionTo('projects')}>Back to cases</MetalButton>
          <MetalButton to={homeSectionTo('contacts')} variant="primary">
            Connect
          </MetalButton>
        </div>
      </section>
    </article>
  )
}
