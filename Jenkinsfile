pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out Online Examination System...'
            }
        }

        stage('Docker Compose Build') {
            steps {
                echo 'Building frontend and backend Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Starting frontend and backend containers...'
                sh 'docker compose down || true'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'docker compose ps'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed. Check the Jenkins console output.'
        }
    }
}