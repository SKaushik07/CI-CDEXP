pipeline {
    agent any
    environment {
        // DOCKER_IMAGE = 'hixej84931fna6/nodejs_exp:latest'
        registryCredential = credentials('docker-hub-config')
        KUBECONFIG = credentials('kubeconfig-credential')

        DOCKER_IMAGE_BASE = 'hixej84931fna6/nodejs_exp'
        DOCKER_IMAGE_VERSION = "${DOCKER_IMAGE_BASE}:${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    sh "${dockerCmd} build -t ${DOCKER_IMAGE_VERSION} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
                        def dockerImage = docker.image("${DOCKER_IMAGE_VERSION}")
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    export KUBECONFIG=$KUBECONFIG
                    kubectl apply -f ./deployment.yaml --namespace ${env} --validate=false
                    kubectl get svc --namespace nodejs-exp
                    """
                }
            }
        }
    }
}
// nodejs-exp
