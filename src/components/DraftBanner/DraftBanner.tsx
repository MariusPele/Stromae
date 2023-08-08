import { PropsWithChildren, useState, useEffect } from 'react';
import { makeStyles } from "@codegouvfr/react-dsfr/tss";
import { Badge } from '@codegouvfr/react-dsfr/Badge';
import { OrchestratedElement } from '../../typeStromae/type';

const useStyles = makeStyles()({
    container: {
        borderBottom: "1px solid var(--border-default-grey)",
    },
});


export function DraftBanner(props: PropsWithChildren<OrchestratedElement>) {
    const { getData, waiting, savingFailure } = props;
    const { classes, cx } = useStyles();
    const [saved, setSaved] = useState(false);
    const timer = 2000;
    let address = '';

    useEffect(() => {
        if (waiting && Boolean(!savingFailure)) {
            setSaved(true);
            setTimeout(() => {
                setSaved(false);
            }, timer);
        }
    }, [waiting]);
    // TO DO: get data from personalization annd remove the getData method props
    // TO DO: mobile screen responsive
    if (getData) {
        address = `Recensement du 80, rue des morillons, 75014 Paris `;
    }
    return (
        <div className={cx(classes.container, "fr-col-12", "fr-p-2w", "fr-mb-1w")}>
            <div className="fr-container">
                {address && <div className="fr-p-1v">
                    <span className="fr-text--bold">{address}</span>
                    <Badge className={"fr-mx-2w"}>BROUILLON</Badge>
                </div>}
                <div className={cx("fr-p-1v")}>
                    {!address && <Badge className="fr-mx-2w">BROUILLON</Badge>}
                    {saved ? <span><i className={cx("fr-icon-checkbox-circle-fill", "fr-label--success", "fr-mr-1v")} />Brouillon enregistré.</span> :
                        <span>Vos réponses sont enregistrées automatiquement à chaque chargement de page.</span>}
                </div>
            </div>
        </div>
    );
}