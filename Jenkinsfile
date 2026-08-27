pipeline {
    agent any

    stages {

        stage('1. Checkout') {
            steps {
                echo 'Checking out Online Examination System source code...'
            }
        }

        stage('2. Build') {
            steps {
                echo 'Building frontend and backend Docker images...'
                sh 'docker compose build'
            }
        }

       stage('3. Automated Testing') {
            steps {
                echo 'Starting application for testing...'

                sh 'docker compose down || true'
                sh 'docker compose up -d'

                sh 'sleep 10'

                sh 'docker compose ps'

                echo 'Testing frontend...'
                sh 'curl -f http://localhost:3000'

                echo 'Testing backend...'
                sh 'curl -f http://localhost:5000'
            }
        }

        stage('4. Code Quality Check') {
            steps {
                echo 'Performing basic code quality checks...'

                sh '''
                    test -f frontend/index.html
                    test -f backend/server.js
                    test -f backend/package.json
                    test -f backend/Dockerfile
                    test -f frontend/Dockerfile

                    echo "Required project files are present."
                '''
            }
        }

        stage('5. Security Check') {
            steps {
                echo 'Performing security check...'

                sh '''
                    cd backend
                    npm audit --audit-level=high || true
                '''
            }
        }

        stage('6. Docker Packaging') {
            steps {
                echo 'Creating Docker images for deployment...'
                sh 'docker compose build'
            }
        }

        stage('7. Deployment') {
            steps {
                echo 'Deploying Online Examination System...'

                sh 'docker compose down || true'
                sh 'docker compose up -d'

                echo 'Application deployed successfully.'
            }
        }

        stage('8. Health Check') {
            steps {
                echo 'Checking deployed containers...'

                sh '''
                    docker compose ps

                    docker compose ps --status running | grep -q exam-backend
                    docker compose ps --status running | grep -q exam-frontend

                    echo "All application containers are running successfully."
                '''
            }
        }
    }

    post {

        success {
            echo '=========================================='
            echo 'CI/CD PIPELINE COMPLETED SUCCESSFULLY'
            echo 'Online Examination System is deployed.'
            echo '=========================================='
        }

        failure {
            echo '=========================================='
            echo 'PIPELINE FAILED'
            echo 'Rollback initiated.'
            echo '=========================================='

            sh 'docker compose down || true'
        }

        always {
            echo 'Pipeline execution completed.'
            sh 'docker compose ps || true'
        }
    }
}