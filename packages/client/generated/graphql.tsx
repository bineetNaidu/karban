import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Card = {
  __typename?: 'Card';
  cardId: Scalars['String'];
  cardBody?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
  deleteProject?: Maybe<Scalars['Boolean']>;
  createTab?: Maybe<Tab>;
  updateTab?: Maybe<Tab>;
  deleteTab?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateProjectArgs = {
  projectName: Scalars['String'];
  projectDescription: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  id: Scalars['ID'];
  data?: Maybe<ProjectUpdateDataInput>;
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTabArgs = {
  projectId: Scalars['ID'];
  tabName: Scalars['String'];
};


export type MutationUpdateTabArgs = {
  projectId: Scalars['ID'];
  data?: Maybe<TabUpdateDataInput>;
};


export type MutationDeleteTabArgs = {
  projectId: Scalars['ID'];
  tabId: Scalars['ID'];
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['ID']>;
  projectName: Scalars['String'];
  projectDescription: Scalars['String'];
  tabs?: Maybe<Array<Maybe<Tab>>>;
};

export type ProjectUpdateDataInput = {
  projectName?: Maybe<Scalars['String']>;
  projectDescription?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedUser?: Maybe<User>;
  allProjects?: Maybe<Array<Maybe<Project>>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  getProjectById?: Maybe<Project>;
  getTabById?: Maybe<Tab>;
};


export type QueryGetProjectByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetTabByIdArgs = {
  id: Scalars['ID'];
};

export type Tab = {
  __typename?: 'Tab';
  _id?: Maybe<Scalars['ID']>;
  tabName: Scalars['String'];
  cards?: Maybe<Array<Maybe<Card>>>;
};

export type TabUpdateDataInput = {
  tabName?: Maybe<Scalars['String']>;
  tabId: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']>;
  username: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  githubId: Scalars['String'];
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type CreateProjectMutationVariables = Exact<{
  projectName: Scalars['String'];
  projectDescription: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, '_id' | 'projectName' | 'projectDescription'>
    & { tabs?: Maybe<Array<Maybe<(
      { __typename?: 'Tab' }
      & Pick<Tab, '_id' | 'tabName'>
    )>>> }
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID'];
  projectName?: Maybe<Scalars['String']>;
  projectDescription?: Maybe<Scalars['String']>;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, '_id' | 'projectName' | 'projectDescription'>
    & { tabs?: Maybe<Array<Maybe<(
      { __typename?: 'Tab' }
      & Pick<Tab, '_id' | 'tabName'>
    )>>> }
  )> }
);

export type AuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticatedUserQuery = (
  { __typename?: 'Query' }
  & { authenticatedUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, '_id' | 'username' | 'avatar' | 'githubId'>
    & { projects?: Maybe<Array<Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, '_id'>
    )>>> }
  )> }
);

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetProjectByIdQuery = (
  { __typename?: 'Query' }
  & { getProjectById?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, '_id' | 'projectName' | 'projectDescription'>
    & { tabs?: Maybe<Array<Maybe<(
      { __typename?: 'Tab' }
      & Pick<Tab, '_id' | 'tabName'>
      & { cards?: Maybe<Array<Maybe<(
        { __typename?: 'Card' }
        & Pick<Card, 'cardId'>
      )>>> }
    )>>> }
  )> }
);


export const CreateProjectDocument = gql`
    mutation CreateProject($projectName: String!, $projectDescription: String!) {
  createProject(
    projectName: $projectName
    projectDescription: $projectDescription
  ) {
    _id
    projectName
    projectDescription
    tabs {
      _id
      tabName
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      projectDescription: // value for 'projectDescription'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: ID!, $projectName: String, $projectDescription: String) {
  updateProject(
    id: $id
    data: {projectName: $projectName, projectDescription: $projectDescription}
  ) {
    _id
    projectName
    projectDescription
    tabs {
      _id
      tabName
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectName: // value for 'projectName'
 *      projectDescription: // value for 'projectDescription'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const AuthenticatedUserDocument = gql`
    query AuthenticatedUser {
  authenticatedUser {
    _id
    username
    avatar
    githubId
    projects {
      _id
    }
  }
}
    `;

/**
 * __useAuthenticatedUserQuery__
 *
 * To run a query within a React component, call `useAuthenticatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthenticatedUserQuery(baseOptions?: Apollo.QueryHookOptions<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(AuthenticatedUserDocument, options);
      }
export function useAuthenticatedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>(AuthenticatedUserDocument, options);
        }
export type AuthenticatedUserQueryHookResult = ReturnType<typeof useAuthenticatedUserQuery>;
export type AuthenticatedUserLazyQueryHookResult = ReturnType<typeof useAuthenticatedUserLazyQuery>;
export type AuthenticatedUserQueryResult = Apollo.QueryResult<AuthenticatedUserQuery, AuthenticatedUserQueryVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: ID!) {
  getProjectById(id: $id) {
    _id
    projectName
    projectDescription
    tabs {
      _id
      tabName
      cards {
        cardId
      }
    }
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;