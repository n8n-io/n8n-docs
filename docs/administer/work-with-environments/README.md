---
description: Understand what environments are in n8n, find out which version your instance uses, and choose between Environments (Classic) and Environments (Preview).
layout:
  description:
    visible: false
---

# Work with environments

Environments let you build and test changes on one n8n instance, then move them to the next step of your release process, such as production. n8n backs environments with Git.

n8n has two versions of this feature:

- [Environments (Classic)](classic/README.md): the original source control feature. You push an instance's work to a Git branch and pull it into another instance.
- [Environments (Preview)](preview/README.md): the newer version, in Preview. You promote changes from one instance to an environment, and the instance for that environment applies them. Environments (Preview) replace Environments (Classic).

An instance uses one version or the other, never both.

## Find out which version your instance uses

In n8n, go to **Settings** and look at the menu entry:

| Menu entry | Version |
|---|---|
| **Environments (Classic)** | [Environments (Classic)](classic/README.md) |
| **Environments** | [Environments (Preview)](preview/README.md) |

On an instance that uses Classic, the **Environments (Classic)** page has an **Upgrade** button. To compare the two versions, migrate, or switch back, see [Upgrade from Environments (Classic)](preview/upgrade-from-environments-classic.md).

## Concepts for both versions

### Why use environments

There are advantages to having more than one environment. Separate environments let you change workflows without breaking the ones running in production. A common setup:

- **Development:** build and change workflows.
- **Production:** run the live workflows.

### What an environment is

In software development, an environment is all the infrastructure and tooling around the code, including the tools that run the software and the specific configuration of those tools. For a more detailed introduction, refer to [Codecademy | Environments](https://www.codecademy.com/article/environments).

Low-code development in n8n is similar. n8n is where you build and run your workflows. Your instance has its own configuration. On Cloud, n8n determines the configuration. On self-hosted instances, there are extensive [configuration options](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration). You may also have changed your instance's settings. This combination of n8n and your instance's configuration and settings is the environment your workflows run in.

In n8n, an environment is also a step in your release process, together with the n8n instance that runs it. Each version of the feature connects the instance to a Git repository and branch that stores the work.

The two versions use the word differently:

- In Environments (Classic), an environment is an n8n instance plus the Git branch it's linked to.
- In Environments (Preview), an environment is a configuration on an instance. It points to a repository and branch, and an instance promotes to one environment and applies from another.

### What source control means

Source control is a way of storing your work in a central place outside the tool you build it in. It lets you keep copies and versions of your work, share it with other people, and move it between places.

In n8n, source control means using a Git repository to store your workflows, and the resources they use, outside your n8n instance. n8n doesn't move work directly from one instance to another. Work travels through the repository.

Source control and environments are closely related but not the same thing:

- Source control is the mechanism: storing work in Git, and sending it to and from your instances.
- Environments are how you use that mechanism: connecting instances, such as development and production, through a repository, so you can move changes through your release process.

Both versions of environments work this way, but they use different words for it:

- Environments (Classic) calls it source control. You push work from an instance to Git and pull it from Git into an instance. The term still appears in page names, in the `source-control` endpoints of the public API, and in self-hosted configuration.
- Environments (Preview) doesn't use the term. It moves work with promote and apply, and calls its use of Git [Git-based promotion](preview/git-based-promotion/README.md).

n8n uses only part of Git's functionality, so don't treat source control in n8n as full version control.

### Git stores the work

Both versions use Git to move work between instances, and you work with the Git host to set up the repository and branches. For the Git concepts n8n uses, such as branches, remotes, and pull or merge requests, and for how each version uses Git, see [Git concepts for environments](git-concepts.md).

For how to arrange instances and branches, see [Choose branching patterns](classic/choose-branching-patterns.md) for Classic and [Plan your environments](preview/plan-your-environments.md) for Preview.

### Credential secrets stay out of Git

Neither version writes credential secrets to the repository. When you move work to a new instance, the credentials it needs must exist on that instance, or you create them there.

Variables differ. Environments (Classic) writes variable stubs without values. Environments (Preview) writes variables with their values.

## Related resources

- [Environments (Classic)](classic/README.md)
- [Environments (Preview)](preview/README.md)
- [Upgrade from Environments (Classic)](preview/upgrade-from-environments-classic.md)
