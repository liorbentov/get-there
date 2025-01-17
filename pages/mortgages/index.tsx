import { format } from 'date-fns'
import { useRouter } from 'next/router'
import styles from './Transactions.module.scss'
import Layout from 'components/layout'
import Loader from 'components/loader'
import Add from 'components/button/plus.svg'
import Button from 'components/button'
import useEnsureLogin from '../../hooks/useEnsureLogin'
import useMortgages from 'hooks/useMortgages'
import { sumBy } from 'lodash'
import { PageHeader } from 'components/Field'
import Table from 'components/Table'
import { MortgageCourse } from 'utils/types'

const TABLE_COLUMNS = [
  { name: 'Bank', path: 'bank' },
  {
    name: 'Amount',
    path: 'courses',
    format: (courses: MortgageCourse[]) => sumBy(courses, 'amount'),
  },
  {
    name: 'When',
    path: 'offeringDate',
    format: (offeringDate: Date) => format(offeringDate, 'dd/MM/yyyy'),
  },
]

export default function Mortgages() {
  useEnsureLogin()
  const router = useRouter()
  const { isLoading, mortgages } = useMortgages()

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          <PageHeader title="Mortgages">
            <Button
              text="New mortgage"
              onClick={() => router.push('/mortgages/new')}
              bordered
              linkTheme
              icon={<Add />}
            />
          </PageHeader>
          <Table
            columns={TABLE_COLUMNS}
            rows={mortgages}
            onRowClick={(mortgageId: string) =>
              router.push(`/mortgages/${mortgageId}`)
            }
          />
        </div>
      )}
    </Layout>
  )
}

// // @ts-ignore
// export default function Mortgages({ fallback }) {
//   return (
//     <SWRConfig value={{ fallback }}>
//       <Layout>
//         <ErrorBoundary fallback={() => <Loader />}>
//           <Suspense fallback={<Loader />}>
//             <MortgagesPage />
//           </Suspense>
//         </ErrorBoundary>
//       </Layout>
//     </SWRConfig>
//   )
// }

// export async function getServerSideProps() {

//   return {
//     props: {
//       fallback: {
//         '/api/mortgages': [],
//       },
//     },
//   }
// }
