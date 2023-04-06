import { useParams } from 'react-router-dom';
import { useDocumentTitle } from '../../useDocumentTitle';
import { OrchestratorReadOnly } from '../../components/orchestrator';
import { Layout } from '../../components/layout';
import { Precedent } from '../../components/navigation/Precedent';
import { Continuer } from '../../components/navigation/Continuer';
import { Formulaire } from '../../components/formulaire';
import { LoadFromApi } from '../../components/loadSourceData/LoadFromApi';
import { OidcSecure } from '../../lib/oidc';
import { Grid } from '../../components/Grid/Grid';

export type QuestionnaireParams = {
	survey?: string;
	unit?: string;
};

const FEATURES = ['VTL', 'MD'];
const COLLECTED = 'COLLECTED';

export function QuestionnaireReadOnly() {
	const { survey, unit } = useParams();
	useDocumentTitle('Questionnaire');
	return (
		<OidcSecure>
			<LoadFromApi survey={survey} unit={unit}>
				<Layout>
					<OrchestratorReadOnly features={FEATURES} savingType={COLLECTED}>
						<Precedent />
						<Grid>
							<Formulaire />
							<Continuer />
						</Grid>
					</OrchestratorReadOnly>
				</Layout>
			</LoadFromApi>
		</OidcSecure>
	);
}
