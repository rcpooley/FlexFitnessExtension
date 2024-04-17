const globalServiceObject = (() => {
    const el =
        document.getElementsByTagName('fitnessclasssignup-widget')[0] ??
        document.getElementsByTagName('my-app')[0];
    if (el == null) {
        console.log('Failed to find global service object');
        return null;
    }
    try {
        return JSON.parse(el.getAttribute('globalserviceobject'));
    } catch (e) {
        console.log('Failed to parrse global service object', e);
        return null;
    }
})();

const contentConfig = {
    userid: globalServiceObject?.userId,
    clientid: globalServiceObject?.clientId,
    programid: config.programID, // globalServiceObject.programId, - ignore global service object program ID since it might be 0
    shouldSignUpForClass: config.shouldSignUpForClass,
};

const STATUS = {
    Waitlisted: 3,
    SignedUp: 2,
    WaitlistOpen: 11,
    WaitlistFull: 9,
    SpotsOpen: 7,
    InThePast: 5,
    Unknown: -1,
};

class Util {
    static dayMillis = 24 * 3600 * 1000;

    /**
     * options: {
     *  method: 'GET' | 'POST' | 'PUT',
     *  url: string,
     *  params?: Record<string, any>,
     *  body?: string,
     *  stringResponse?: boolean, // default: false. If true will NOT parse response as JSON
     * }
     */
    static makeRequest({ method, url, urlParams, body, stringResponse }) {
        console.log('making request', {
            method,
            url,
            urlParams,
            body,
            stringResponse,
        });
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const searchParams = new URLSearchParams();
            for (const [k, v] of Object.entries(urlParams ?? {})) {
                searchParams.set(k, v);
            }
            urlObj.search = searchParams.toString();
            const xhr = new XMLHttpRequest();
            xhr.open(method, urlObj.toString());
            xhr.setRequestHeader(
                'Content-Type',
                'application/json; charset=UTF-8'
            );
            xhr.onreadystatechange = () => {
                console.log('ready state change', xhr);
                if (xhr.readyState == 4) {
                    try {
                        if (xhr.status == 200 || xhr.status === 201) {
                            let response = xhr.responseText;
                            if (!stringResponse) {
                                response = JSON.parse(response);
                            }
                            resolve(response);
                        } else {
                            throw new Error(
                                `Bad status ${xhr.status}: ${xhr.statusText}`
                            );
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            };
            xhr.onerror = reject;
            xhr.send(body);
        });
    }

    static async listClasses({ startDate, endDate }) {
        console.log(
            `querying ${startDate.toISOString()} to ${endDate.toISOString()}`
        );
        return await this.makeRequest({
            method: 'GET',
            url: 'https://flex.plusone.com/api/FitnessClassSessions',
            urlParams: {
                userid: contentConfig.userid,
                clientid: contentConfig.clientid,
                programid: contentConfig.programid,
                utcStartDate: startDate.toISOString(),
                utcEndDate: endDate.toISOString(),
            },
        });
    }

    static async listAllClasses() {
        console.log('Querying all classes...');
        let curDate = new Date();
        let allClasses = [];
        const step = 7 * this.dayMillis;
        while (true) {
            try {
                const endDate = new Date(curDate.getTime() + step);
                const classes = await this.listClasses({
                    startDate: curDate,
                    endDate,
                });
                allClasses = allClasses.concat(classes);
                curDate = endDate;
            } catch (e) {
                // 404 will be thrown once no more classes are available
                return allClasses;
            }
        }
    }

    static async signUpForClass(fitnessClassSessionId) {
        console.log(`Signing up for`, fitnessClassSessionId);
        return await this.makeRequest({
            method: 'POST',
            url: 'https://flex.plusone.com/api/FitnessClassSessions',
            body: JSON.stringify({
                userId: contentConfig.userid,
                fitnessClassSessionId,
            }),
        });
    }

    static async cancelClass(fitnessclasssessionsignupid) {
        console.log('Cancelling', fitnessclasssessionsignupid);
        await this.makeRequest({
            method: 'PUT',
            url: 'https://flex.plusone.com/api/FitnessClassSessionSignups',
            urlParams: {
                userid: contentConfig.userid,
                clientid: contentConfig.clientid,
                programid: contentConfig.programid,
                fitnessclasssessionsignupid,
                Action: 'Cancel',
            },
            stringResponse: true,
        });
    }
}

class Render {
    root = null;
    loading = null;
    classes = null;
    renderAll = null;
    inputSearch = null;

    static start() {
        this.renderAll = config.showAllClassesByDefault;
        const div = document.createElement('div');
        div.id = 'zumbaRoot';
        div.style.position = 'fixed';
        div.style.width = '500px';
        div.style.maxHeight = '800px';
        div.style.background = 'white';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.boxShadow = '0 0 6px 3px #c3c3c3';
        div.style.borderRadius = '7px';
        div.style.overflow = 'auto';
        div.style.padding = '10px 20px 20px 20px';
        this.root = div;
        document.body.appendChild(div);
        const header = document.createElement('div');
        header.innerHTML = `
            <div style="text-align:center;font-size:20px;font-weight:bold;">Upcoming classes</div>
            <button style="position:absolute;top:10px;right:10px">Close</button>
            <div id="subheader" style="display:none;flex-direction:column;align-items:center">
                <button id="toggleClassesBtn"></button>
                <input id="subheadersearch" type="text" placeholder="Search" style="margin-top:5px;width:100%;display:none" />
            </div>
        `;
        header.getElementsByTagName('button')[0].onclick = () => div.remove();
        header.style.marginBottom = '10px';
        div.appendChild(header);
        this.loading = document.createElement('div');
        this.loading.innerHTML = 'Loading...';
        div.appendChild(this.loading);
        const toggleClassesBtn = document.getElementById('toggleClassesBtn');
        this.inputSearch = document.getElementById('subheadersearch');
        toggleClassesBtn.onclick = () => {
            this.renderAll = !this.renderAll;
            this.updateAllClassVisibility();
        };
        this.inputSearch.onkeyup = () => this.updateAllClassVisibility();
    }

    static onLoadClasses(classes) {
        this.classes = classes;
        this.loading.remove();
        document.getElementById('subheader').style.display = 'flex';
        for (const info of classes) {
            this.renderClass(info);
        }
        this.updateAllClassVisibility();
    }

    static renderClass(info) {
        const div = document.createElement('div');
        div.style.border = '1px solid black';
        div.style.padding = '5px';
        div.style.borderRadius = '5px';
        div.style.display = 'flex';
        div.style.marginBottom = '5px';
        div.innerHTML = `
            <div>
                <div><strong>${info.className}</strong></div>
                <div>Instructor: ${info.instructor}</div>
                <div>Start time: ${config.renderDate(
                    new Date(info.startDateTime)
                )}</div>
            </div>
            <div style="flex-grow:1;display:flex;justify-content:center;align-items:center;">
                <button></button>
            </div>
        `;
        this.root.appendChild(div);
        info._element = div;
        const btn = div.getElementsByTagName('button')[0];
        btn.onclick = () => {
            (async () => {
                switch (info.sessionStatusMessage) {
                    case STATUS.Waitlisted:
                    case STATUS.SignedUp:
                        await Util.cancelClass(
                            info.fitnessClassSessionSignupID
                        );
                        const start = new Date(info.startDateTime);
                        const refetchClasses = await Util.listClasses({
                            startDate: new Date(
                                start.getTime() - Util.dayMillis
                            ),
                            endDate: new Date(start.getTime() + Util.dayMillis),
                        });
                        const refetchClass = refetchClasses.find(
                            (c) =>
                                c.fitnessClassSessionID ===
                                info.fitnessClassSessionID
                        );
                        info.sessionStatusMessage =
                            refetchClass?.sessionStatusMessage ??
                            STATUS.Unknown;
                        info.fitnessClassSessionSignupID = 0;
                        this.updateClass(info);
                        break;
                    case STATUS.SpotsOpen:
                    case STATUS.WaitlistFull: // might as well try
                    case STATUS.WaitlistOpen:
                        const result = await Util.signUpForClass(
                            info.fitnessClassSessionID
                        );
                        info.fitnessClassSessionSignupID =
                            result.fitnessClassSessionSignupId;
                        switch (result.status) {
                            case 1:
                                info.sessionStatusMessage = STATUS.SignedUp;
                                break;
                            case 3:
                                info.sessionStatusMessage = STATUS.Waitlisted;
                                break;
                            default:
                                console.log('Unknown result status', result);
                                info.sessionStatusMessage = STATUS.Unknown;
                                break;
                        }
                        this.updateClass(info);
                        break;
                }
            })().catch((e) => {
                console.error(e);
                alert('An error occurred, check console for details');
            });
        };
        this.updateClass(info);
    }

    static updateClass(info) {
        const div = info._element;
        const btn = div.getElementsByTagName('button')[0];
        const statusConfig = {
            // on the waitlist
            [STATUS.Waitlisted]: {
                bg: '#ffffb1',
                btn: 'Cancel',
            },
            // signed up
            [STATUS.SignedUp]: {
                bg: '#c0ffc2',
                btn: 'Cancel',
            },
            // not signed up, spots full, waitlist open
            [STATUS.WaitlistOpen]: {
                bg: '#ffbcbc',
                btn: 'Add to waitlist',
            },
            // not signed up, spots full, waitlist full
            [STATUS.WaitlistFull]: {
                bg: '#ffbcbc',
                btn: 'Waitlist is full',
                disabled: true,
            },
            // not signed up, spots open
            [STATUS.SpotsOpen]: {
                bg: '#ffbcbc',
                btn: 'Sign up',
            },
            // class in the past
            [STATUS.InThePast]: {
                bg: '#b8b8b8',
                btn: 'Class is in the past',
                disabled: true,
            },
        };
        const config = statusConfig[info.sessionStatusMessage] ?? {
            bg: 'gray',
            btn: 'Unknown status',
            disabled: true,
        };
        div.style.background = config.bg;
        btn.innerHTML = config.btn;
        btn.disabled = config.disabled ?? false;
        this.updateClassVisibility(info);
    }

    static updateAllClassVisibility() {
        document.getElementById('toggleClassesBtn').innerHTML = this.renderAll
            ? 'Hide all classes'
            : 'Show all classes';
        this.inputSearch.style.display = this.renderAll ? 'block' : 'none';
        for (const info of this.classes) {
            this.updateClassVisibility(info);
        }
    }

    static updateClassVisibility(info) {
        info._element.style.display = this.shouldRenderClass(info)
            ? 'flex'
            : 'none';
    }

    static shouldRenderClass(info) {
        if (this.renderAll) {
            const filter = this.inputSearch.value.toLowerCase().trim();
            const haystack = [info.className, info.instructor]
                .join(' ')
                .toLowerCase();
            return haystack.includes(filter);
        }
        return (
            // always display a class if you're signed up for it
            info.fitnessClassSessionSignupID !== 0 ||
            // custom filtering logic
            contentConfig.shouldSignUpForClass(info)
        );
    }
}

async function main() {
    if (globalServiceObject == null) return;
    Render.start();
    const classes = await Util.listAllClasses();
    Render.onLoadClasses(classes);
}

main().catch((e) => console.error('ERROR', e));
