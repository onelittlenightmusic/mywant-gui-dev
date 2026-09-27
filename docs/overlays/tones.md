# Tones <Badge type="tip" text="mywant-gui" />

A tone is what an action **means**. The design turns it into a colour; the
overlay never names one. That is what keeps "Cancel" the same colour in every
overlay, whichever design is in use.

| Tone | Means | For example | In `grid` |
|---|---|---|---|
| `confirm` | Go ahead | Yes, OK, Create, Save, Start, Approve, Deploy | emerald |
| `cancel` | Leave without doing anything | No, Cancel, Close, Back | gray |
| `danger` | Cannot be taken back, or refuses | Delete, Deny, Stop; Yes to a destructive question | rose |
| `primary` | The ordinary action | Open, Edit, Detail, Restart | blue |
| `caution` | Reversible, but stops something | Suspend, Archive, Drop, Lock | amber |
| `info` | Go somewhere, call someone; a pre-selected choice | Go to, Call, Open in tab | sky |
| `accent` | A setting set apart from ordinary actions | Password, Set home | indigo |
| `special` | About a person or a presentation | Ride, Add Aura, Inspect, Expose | violet |
| `muted` | One of several equal choices | A group to join, Map | slate |

## Choosing one

Ask what pressing it does, not what colour it should be:

- A yes to a question whose answer deletes something is `danger`, not `confirm`.
- Two sides of a toggle are one tone with `off` on the inactive side
  (`tone: 'special', off: !isExposed`), not two tones.
- A colour that is **data** — a character's own colour, the wire's — is not a
  tone. Pass it as `color`.

## In TypeScript

`tone` is typed `OverlayTone`. An item built inside a conditional spread
(`...(cond ? [{ ... }] : [])`) is not contextually typed, so its literal widens to
`string`; write `tone: 'danger' as const` there.
