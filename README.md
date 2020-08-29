# Home Assistant Community Add-on: Wave Engine Sample

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]
[![License][license-shield]](LICENSE)

![Supports aarch64 Architecture][aarch64-shield]
![Supports amd64 Architecture][amd64-shield]
![Supports armhf Architecture][armhf-shield]
![Supports armv7 Architecture][armv7-shield]
![Supports i386 Architecture][i386-shield]

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

Sample add-on that hosts a WebGL2 sample application made with Wave Engine 3.0 Preview.

## About

This add-on is sample that hosts a WebGL2 sample application made with Wave Engine 3.0 Preview.

It is designed to be used as a startup structure for Add-ons based on [Wave Engine](https://waveengine.net/).

Using Wave Engine brings the possibility of developing web graphics apps integrated within Home Assistant.

This add-on is using Ingress to embed its interface securely into Home Assistant.

[:books: Read the full add-on documentation][docs]

## Installation

1. Go to your Home Assistant web UI, "Supervisor" > "Add-on Store", Click 3-dots menu at upper right > "Repositories" and add this repository URL: [https://github.com/vicfergar/addon-wave-sample](https://github.com/vicfergar/addon-wave-sample)
1. Scroll down the page to find the new repository, and click the new add-on named "Wave Engine Sample"
1. Click "Install" and give it a few minutes to finish downloading.
1. Click "Start", give it a few seconds to spin up, and then click the "Open Web UI" button that appears.

## Contributing

This is an active open-source project. We are always open to people who want to
use the code or contribute to it.

Thank you for being involved! :heart_eyes:

## Authors & contributors

The original setup of this repository is by [Victor Ferrer][vicfergar].

For a full list of all authors and contributors,
check [the contributor's page][contributors].

## We have got some Home Assistant add-ons for you

Want some more functionality to your Home Assistant instance?

We have created multiple add-ons for Home Assistant. For a full list, check out
our [GitHub Repository][repository].

## License

MIT License

Copyright (c) 2020 Victor Ferrer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[commits-shield]: https://img.shields.io/github/commit-activity/y/vicfergar/addon-wave-sample.svg
[commits]: https://github.com/vicfergar/addon-wave-sample/commits/master
[contributors]: https://github.com/vicfergar/addon-wave-sample/graphs/contributors
[docs]: https://github.com/vicfergar/addon-wave-sample/blob/master/wave-sample/DOCS.md
[vicfergar]: https://github.com/vicfergar
[gitlabci-shield]: https://gitlab.com/vicfergar/addon-wave-sample/badges/master/pipeline.svg
[gitlabci]: https://gitlab.com/vicfergar/addon-wave-sample/pipelines
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[issue]: https://github.com/vicfergar/addon-wave-sample/issues
[license-shield]: https://img.shields.io/github/license/vicfergar/addon-wave-sample.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2020.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-production%20ready-brightgreen.svg
[reddit]: https://reddit.com/r/homeassistant
[releases-shield]: https://img.shields.io/github/release/vicfergar/addon-wave-sample.svg
[releases]: https://github.com/vicfergar/addon-wave-sample/releases
[repository]: https://github.com/hassio-addons/repository
