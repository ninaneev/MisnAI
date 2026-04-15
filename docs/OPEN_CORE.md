# Taskoona Open-Core Boundary

Taskoona core is the public, local-first app. It must remain useful without paid APIs, accounts, cloud services, or hosted AI.

## Public Core

The public repository includes:

- local-first daily execution
- deterministic task generation from profile, strategy, milestones, personality, and templates
- strategy phases
- milestones
- history
- decision matrices
- context and vision capture
- import/export backup
- public founder templates
- no-op cloud adapter interfaces

The public app must work with no server and no operating cost.

## Private Cloud

Use a private repository named `taskoona-cloud` for:

- hosted AI review
- cloud-generated plans
- sync across devices
- accounts and auth
- billing
- team workspaces
- integrations
- hosted backups
- private prompts, evals, admin tools, and customer data handling

Do not put secrets, billing enforcement, customer data handling, private prompts, or hosted AI orchestration in the public repo.

## Integration Rule

Public code may define adapter interfaces and local/no-op defaults. Private cloud code implements paid behavior behind hosted APIs.

The public app should stay functional when every cloud flag is off.
